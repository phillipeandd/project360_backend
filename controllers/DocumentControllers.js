const DocumentModel = require("../models/DocumentModel");

const postDocument = async (req, res) => {
  try {
  const { files } = req;
  const {employee_id } = req.body;

  const fileArray = files.map((file) => ({
    name: file.originalname,
    path: file.path,
  }));

  const new_document = new DocumentModel({
    employee_id,
    files: fileArray,
  });

  
    await new_document.save();
    res.status(200).send({ message: "Document uploaded successfully", new_document });
  } catch (err) {
    console.error("Error uploading document", err);
    res.status(500).send("Error uploading document");
  }
};

// Get all events
const getAllDocuments = async (req, res) => {
  try {
    const documents = await DocumentModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postDocument, getAllDocuments };
