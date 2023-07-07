const mongoose = require("mongoose");
const path = require('path');
const fileUploadSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
  },
  { timestamps: true }
);

const FileUploadModel = mongoose.model("FileUpload", fileUploadSchema);

module.exports = FileUploadModel;
