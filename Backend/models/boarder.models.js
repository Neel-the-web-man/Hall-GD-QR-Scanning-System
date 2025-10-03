const {Schema}=require('mongoose');
const mongoose = require('mongoose');
const BoarderSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        rollNo:{
            type:String,
            required:true,
            unique:true
        },
        roomNo:{
            type:String,
        },
        phoneNo:{
            type:Number,
            unique:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true
        },
        qrCodeId:{
            type:String,
            unique:true,
        },
        isScanned:{
            type:Boolean,
            default:false
        }
    }
);
const Boarder = mongoose.model("Boarder", BoarderSchema);
module.exports = Boarder;