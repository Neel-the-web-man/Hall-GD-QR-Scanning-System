const express = require("express");
const Boarder = require("../models/boarder.models.js");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware.js");

// Get all boarders
router.get("/",verifyToken, async (req, res) => {
  const boarders = await Boarder.find();
  res.json(boarders);
});

router.get("/:qrid", verifyToken, async (req, res) => {
  const { qrid } = req.params;

  const boarder = await Boarder.findOne({ qrCodeId: qrid });
  if (!boarder) return res.status(404).json({ message: "Invalid QR" });

  res.json(boarder);
});

module.exports = router;