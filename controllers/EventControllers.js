const EventModel = require("../models/EventModel");

const postEvent = async (req, res) => {
  const { files } = req;
  const { title, description, department, employee, start, end } = req.body;

  const fileArray = files.map(file => ({
    name: file.originalname,
    path: file.path,
  }));

  const new_event = new EventModel({
    title,
    description,
    department,
    employee,
    start,
    end,
    files: fileArray, 
  });

  try {
    await new_event.save();
    res.status(200).send({ message: "Event posted successfully", new_event });
  } catch (err) {
    console.error("Error posting event", err);
    res.status(500).send("Error posting event");
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postEvent, getAllEvents };
