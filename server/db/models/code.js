const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  currentCode: {
    type: Number,
    default: 0
  },
});

const Code = mongoose.model("Code", codeSchema);


module.exports = Code;
