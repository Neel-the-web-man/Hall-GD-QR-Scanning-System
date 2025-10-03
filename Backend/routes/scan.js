const express = require("express");
const Boarder = require("../models/boarder.models.js");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware.js");


router.post("/",verifyToken, async (req, res) => {
  const { qrCodeId } = req.body;

  const boarder = await Boarder.findOne({ qrCodeId });
  if (!boarder) return res.status(404).json({ message: "Invalid QR" });

  if (boarder.isScanned)
    return res.status(400).json({ message: "Already scanned" });

  boarder.isScanned = true;
  await boarder.save();

  res.json({ message: "Scan successful", boarder });
});

module.exports = router;