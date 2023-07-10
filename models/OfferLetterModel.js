const mongoose = require("mongoose");
const path = require("path");
const offerLetterSchema = new mongoose.Schema(
  {
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    path: String,
  },
  { timestamps: true }
);

const OfferLetterModel = mongoose.model("OfferLetter", offerLetterSchema);

module.exports = OfferLetterModel;
