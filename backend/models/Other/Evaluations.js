const mongoose = require("mongoose");

const Evaluations = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  performance: {
    type: Map,
  },
  competence: {
    type: Map,
  }
}, { timestamps: true });

module.exports = mongoose.model("Evaluation", Evaluations);
