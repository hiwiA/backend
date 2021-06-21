const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Tasks = new Schema({
  tms_number: {
    type: String,
  },
  tms_name: {
    type: String,
  },
  tms_description: {
    type: String,
  },
  tms_assigned: {
    type: String,
  },
  tms_startdate: {
    type: String,
  },
  tms_enddate: {
    type: String,
  },
  tms_status: {
    type: String,
  },
  tms_completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Tasks", Tasks);
