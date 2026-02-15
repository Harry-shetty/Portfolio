import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/harsha_messages';

async function main() {
  try {
    await mongoose.connect(uri, { connectTimeoutMS: 5000 });
    console.log('Connected to MongoDB at', uri);

    const db = mongoose.connection.db;
    const collNames = await db.listCollections().toArray();
    const names = collNames.map(c => c.name);
    console.log('Collections:', names.join(', '));

    if (!names.includes('messages')) {
      console.log('No `messages` collection found.');
    } else {
      const docs = await db.collection('messages').find({}).sort({ createdAt: -1 }).limit(10).toArray();
      console.log(`Last ${docs.length} documents in messages:`);
      docs.forEach(d => console.log(JSON.stringify(d)));
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting or querying MongoDB:', err);
    process.exit(2);
  }
}

main();
