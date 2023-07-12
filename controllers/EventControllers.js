const EventModel = require("../models/EventModel");

const postEvent = async (req, res) => {
    const { files } = req;
    const {
      eventtitle,
      eventdescription,
      department,
      employee,
      start_date,
      end_date,
      selectedDate,
    } = req.body;
    
    const fileDetails = files.map(file => ({
      name: file.originalname,
      path: file.path,
    }));
  
    const new_event = new EventModel({
      eventtitle,
      eventdescription,
      department,
      employee,
      start_date,
      end_date,
      selectedDate,
      files: fileDetails,
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

module.exports ={postEvent,getAllEvents}
