const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groups: [{
    type: String,
  }],
});

const Group = mongoose.model("Group", groupSchema);


module.exports = Group;