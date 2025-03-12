const mongoose = require("mongoose");

const ctsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensuring unique emails
    phone: { type: String, required: false }, // Phone is optional
    message: { type: String, required: true },
    consent: { type: Boolean, required: true }, // Changed to Boolean for better logic
  },
  { timestamps: true }
);

const CtsModel = mongoose.model("Cts", ctsSchema);

module.exports = CtsModel;
