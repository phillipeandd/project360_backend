const mongoose = require("mongoose")

const LeaveSchema = new mongoose.Schema({

})

const LeaveModel = mongoose.model("Leave", LeaveSchema)

module.exports = LeaveModel