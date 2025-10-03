require("dotenv").config();
const mongoose=require('mongoose'); 
const Boarder=require('./models/boarder.models.js');
const {generateAndAssignQRCode}=require('./generateQR.js');
const {sendEmail}=require('./emailer.js');

async function mailAllBoarders(){
    const boarders=await Boarder.find();
    for(const boarder of boarders){
        try{
            const qrBuffer=await generateAndAssignQRCode(boarder);
            
            if (!qrBuffer) {
                console.error(`Failed to generate QR for ${boarder.email}`);
                continue;
            }
            await sendEmail(
                boarder.email,
                "Your Grand Dinner QR Code",
                `<h1>Hello ${boarder.name},</h1>
                <p>Please carry this QR to the dinner.</p>
                 <img src="cid:qrcode" alt="QR Code" style="width:200px;height:200px;" />`,
                [
                    {
                        filename: "qrcode.png",
                        content: qrBuffer,
                        cid: "qrcode" 
                    }
                ]
            );
            console.log(`Sent to ${boarder.email}`);
        }catch (err) {
            console.error(`Failed for ${boarder.email}`, err);
        }
    }
}

module.exports = { mailAllBoarders };
