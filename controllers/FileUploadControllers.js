const FileUploadModel = require("../models/FileUploadModel");
const path = require("path");
const fileUpload = async (req, res) => {
  const { file } = req;
  const newFile = new FileUploadModel({
    name: file.originalname,
    path: file.path,
  });

  newFile.save((err) => {
    if (err) {
      console.error("Error saving file to MongoDB:", err);
      res.status(500).send("Error saving file to MongoDB");
    } else {
      res.send("File uploaded successfully");
    }
  });
};

const fileDownload = async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "uploads", fileName);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};

module.exports = {
  fileUpload,
  fileDownload,
};
