const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
  },
  { timestamps: true }
);

const FileUploadModel = mongoose.model("FileUpload", fileUploadSchema);

module.exports = FileUploadModel;
