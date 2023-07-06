const FileUploadModel = require("../models/FileUploadModel");

const fileUpload = async (req, res) => {
  const { filename, path } = req.file;

  // Save file details to MongoDB
  const newFile = new FileUploadModel({ filename, path });
  await newFile.save();

  res.json({ message: "File uploaded successfully." });
};

module.exports = {
  fileUpload,
};
