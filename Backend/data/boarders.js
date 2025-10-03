const { v4: uuidv4 } = require("uuid");

const boarders = [
  {
    name: "Neel Kotkar",
    rollNo: "101",
    roomNo: "A101",
    phoneNo: "9876543210",
    qrCodeId: uuidv4(),
    email: "neelkotkar@gmail.com",
    isScanned: false
  },
  {
    name: "Neel Kotkar 2",
    rollNo: "102",
    roomNo: "A102",
    phoneNo: "9876543211",
    qrCodeId: uuidv4(),
    email: "neelkotkar2@gmail.com",
    isScanned: false
  },
  {
    name: "Neel IIT KGP",
    rollNo: "103",
    roomNo: "A103",
    phoneNo: "9876543212",
    qrCodeId: uuidv4(),
    email: "neelkotkar@kgpian.iitkgp.ac.in",
    isScanned: false
  },
  {
    name: "Aarav Sharma",
    rollNo: "104",
    roomNo: "B101",
    phoneNo: "9876543213",
    qrCodeId: uuidv4(),
    email: "krishnarai082005@gmail.com",
    isScanned: false
  },
  {
    name: "Pranav Khare",
    rollNo: "105",
    roomNo: "B102",
    phoneNo: "9876543214",
    qrCodeId: uuidv4(),
    email: "pranavkhare12345@gmail.com",
    isScanned: false
  }
];

module.exports = boarders;
