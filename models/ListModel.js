const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listName: {
      type: String,
      required: true,
      trim: true,
    },
    listColor: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ListModel = mongoose.model("List", ListSchema);

module.exports = { ListModel, ListSchema };
