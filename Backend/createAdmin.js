require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin.models.js");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "neelkotkar@gmail.com";      
  const password = "abc123@";           

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = new Admin({ email, passwordHash });
  await admin.save();

  console.log("Admin created:", email);

  mongoose.disconnect();
}

createAdmin();