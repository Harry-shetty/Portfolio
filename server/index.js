import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { google } from "googleapis";
import cors from "cors";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/harsha_messages";
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID; // spreadsheet id, e.g. from the share URL
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY; // use escaped \n for newlines in env

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
    // If Google Sheets env is configured, append the message there instead of MongoDB
    if (GOOGLE_SHEET_ID && GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY) {
      try {
        // private key in env often contains escaped newlines \n; convert to real newlines
        const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

        const jwtClient = new google.auth.JWT(
          GOOGLE_CLIENT_EMAIL,
          null,
          privateKey,
          ["https://www.googleapis.com/auth/spreadsheets"]
        );

        await jwtClient.authorize();
        const sheets = google.sheets({ version: "v4", auth: jwtClient });

        const timestamp = new Date().toISOString();
        const values = [[timestamp, name, email, message]];

        await sheets.spreadsheets.values.append({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: "Sheet1!A:D",
          valueInputOption: "USER_ENTERED",
          requestBody: { values },
        });

        return res.status(201).json({ success: true, source: "sheets" });
      } catch (sheetErr) {
        console.error("Google Sheets append error:", sheetErr);
        // fall back to MongoDB below
      }
    }

    // Fallback: save to MongoDB
    const doc = new Message({ name, email, message });
    await doc.save();

    return res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

// Helper: simple email format validation
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  // Basic email regex (covers common cases, not fully RFC-complete)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Get messages filtered by email (requires valid email query param)
app.get("/api/messages", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "email query parameter is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "invalid_email" });
    }

    const messages = await Message.find({ email }).sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({ success: true, count: messages.length, messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
