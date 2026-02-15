import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/harsha_messages";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health
app.get("/", (req, res) => res.send({ status: "ok" }));

// Create message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    const doc = new Message({ name, email, message });
    await doc.save();

    return res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
