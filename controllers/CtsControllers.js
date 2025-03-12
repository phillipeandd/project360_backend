const CtsModel = require("../models/CtsModel"); // Import model

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message, consent } = req.body;

    // Basic validation
    if (!name || !email || !message || consent === undefined) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    // Save to database
    const newEntry = new CtsModel({
      name,
      email,
      phone,
      message,
      consent,
    });

    await newEntry.save();

    return res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { submitContactForm };
