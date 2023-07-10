const ProbationLetterModel = require("../models/ProbationLetterModel");
const path = require("path");

const postProbationLetter = async (req, res) => {
  const { file } = req;
  const { employee_id } = req.body;
  const newFile = new ProbationLetterModel({
    employee_id,
    name: file.originalname,
    path: file.path,
  });

  try {
    await newFile.save();
    res.send("File uploaded successfully");
  } catch (err) {
    console.error("Error saving file to MongoDB:", err);
    res.status(500).send("Error saving file to MongoDB");
  }
};

// Get all files
const getAllProbationFiles = async (req, res) => {
  try {
    const files = await ProbationLetterModel.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const probationDownload = async (req, res) => {
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
  postProbationLetter,
  probationDownload,
  getAllProbationFiles,
};
