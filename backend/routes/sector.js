const express = require("express");
const router = express.Router();
const Sector = require("../models/Other/Sector");

router.get("/getSector", async (req, res) => {
  try {
    let sector = await Sector.find();
    if (!sector) {
      return res
        .status(400)
        .json({ success: false, message: "No Sector Available" });
    }
    const data = {
      success: true,
      message: "All Sector Loaded!",
      sector,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addSector", async (req, res) => {
  let { name, code } = req.body;
  try {
    let sector = await Sector.findOne({ code });
    if (sector) {
      return res
        .status(400)
        .json({ success: false, message: "Sector Already Exists" });
    }
    await Sector.create({
      name,
      code,
    });
    const data = {
      success: true,
      message: "Sector Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteSector/:id", async (req, res) => {
  try {
    let sector = await Sector.findByIdAndDelete(req.params.id);
    if (!sector) {
      return res
        .status(400)
        .json({ success: false, message: "No Sector Exists!" });
    }
    const data = {
      success: true,
      message: "Sector Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
