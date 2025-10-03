const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.models.js");
const router = express.Router();
const { mailAllBoarders } = require("../sendMail.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

router.post("/verify", (req, res) => {
  const authHeader = req.headers["authorization"];
  // console.log("Auth Header:", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // invalid or expired
    res.json({ valid: true, user });
  });
});

router.post("/send-mails", async (req, res) => {
  try {
    await mailAllBoarders();
    res.json({ success: true, message: "Mails sent successfully" });
  } catch (err) {
    console.error("Mail sending failed:", err);
    res.status(500).json({ success: false, message: "Failed to send mails" });
  }
});

module.exports = router;