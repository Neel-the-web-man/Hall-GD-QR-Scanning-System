const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/db.js");
const adminRoutes = require("./routes/admin");
const scanRoutes = require("./routes/scan");
const boarderRoutes = require("./routes/boarders");

const app = express();
connectDb();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/scan", scanRoutes);
app.use("/boarders", boarderRoutes);
app.listen(process.env.PORT||5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});