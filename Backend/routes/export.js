const express = require("express");
const Boarder = require("../models/boarder.models.js");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware.js");
const XLSX = require("xlsx");

// Route to export all students/boarders to Excel
router.get("/studentsdata", verifyToken, async (req, res) => {
  try {
    // Fetch all boarders from MongoDB
    const boarders = await Boarder.find({}).lean(); // lean() returns plain JS objects

    // Remove _id and qrCodeId
    const data = boarders.map(({ _id, qrCodeId,__v, ...rest }) => rest);

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Boarders");

    // Write workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Send file as download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="boarders.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error exporting boarders" });
  }
});

module.exports = router;
