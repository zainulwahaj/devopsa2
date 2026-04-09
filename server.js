const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/devops_assignment_db";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }).lean();
    return res.render("index", { notes, error: null });
  } catch (error) {
    return res.status(500).render("index", {
      notes: [],
      error: "Could not fetch notes from database.",
    });
  }
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    const notes = await Note.find().sort({ createdAt: -1 }).lean();
    return res.status(400).render("index", {
      notes,
      error: "Title and content are required.",
    });
  }

  try {
    await Note.create({ title, content });
    return res.redirect("/");
  } catch (error) {
    const notes = await Note.find().sort({ createdAt: -1 }).lean();
    return res.status(500).render("index", {
      notes,
      error: "Could not save note to database.",
    });
  }
});

app.post("/notes/:id/delete", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Could not delete note.");
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
