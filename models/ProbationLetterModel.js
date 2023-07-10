const mongoose = require("mongoose");
const path = require("path");
const probationLetterSchema = new mongoose.Schema(
  {
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    path: String,
  },
  { timestamps: true }
);

const ProbationLetterModel = mongoose.model("ProbationLetter", probationLetterSchema);

module.exports = ProbationLetterModel;
