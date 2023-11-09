const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});
const documentSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    files: [fileSchema],
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", documentSchema);

module.exports = DocumentModel;
