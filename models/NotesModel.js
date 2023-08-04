const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

const NotesModel = mongoose.model("Notes", noteSchema);

module.exports = NotesModel;
