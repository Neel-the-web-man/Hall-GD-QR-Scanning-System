const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Boarder = require("./models/boarder.models.js");

async function generateAndAssignQRCode(boarder){
    const qrId=uuidv4();
    boarder.qrCodeId=qrId;
    await boarder.save();

    const qrData="http://localhost:3000/scan/boarder/"+qrId;
    try {
        const qrBuffer = await QRCode.toBuffer(qrData);
        return qrBuffer;
    } catch (err) {
      console.error("Error generating QR:", err);
    }
    return null;
}

module.exports = { generateAndAssignQRCode };