const express = require("express");
const router = express.Router();
const Evaluations = require("../models/Other/Evaluations");

router.post("/getEvaluations", async (req, res) => {
  try {
    let Evaluation = await Evaluations.find(req.body);
    if (!Evaluation) {
      return res
        .status(400)
        .json({ success: false, message: "Evaluations Not Available" });
    }
    const data = {
      success: true,
      message: "All Evaluations Loaded!",
      Evaluation,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addEvaluations", async (req, res) => {
  let { enrollmentNo } = req.body;
  try {
    let Evaluation = await Evaluations.findOne({ enrollmentNo });
    if (Evaluation) {
      await Evaluations.findByIdAndUpdate(Evaluation._id, req.body);
      const data = {
        success: true,
        message: "Evaluations Added!",
      };
      res.json(data);
    } else {
      await Evaluations.create(req.body);
      const data = {
        success: true,
        message: "Evaluations Added!",
      };
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteEvaluations/:id", async (req, res) => {
  try {
    let evaluation = await Evaluations.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res
        .status(400)
        .json({ success: false, message: "No Evaluations Data Exists!" });
    }
    const data = {
      success: true,
      message: "Evaluations Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
