const mongoose = require("mongoose");
require("dotenv").config();
const Boarder = require("./models/boarder.models.js");
const boarders = require("./data/boarders.js");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      // Optional: clear existing data
      await Boarder.deleteMany();

      await Boarder.insertMany(boarders);
      console.log("Sample boarders inserted!");
    } catch (err) {
      console.error(err);
    } finally {
      // disconnect after all operations
      await mongoose.disconnect();
      process.exit();
    }
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
