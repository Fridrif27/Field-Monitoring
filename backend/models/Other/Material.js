const mongoose = require("mongoose");

const Material = new mongoose.Schema({
  manager: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Material", Material);
