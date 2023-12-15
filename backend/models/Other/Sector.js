const mongoose = require("mongoose");

const Sector = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Sector", Sector);
