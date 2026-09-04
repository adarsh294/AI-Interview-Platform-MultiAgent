import mongoose from "mongoose";
import { type } from "os";
  
const Userschema= new mongoose.Schema({
    firstnamebaseUid:{
        type:String,
        required:[true,'firstnamebaseUid is required'],
        trim:true
    },
   name:{
        type:String,
        required:[true,'username is required'],
        trim:true,
        unique:true
},
 email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
interviewcoins:{
        type:Number,
        default:150
    
    }
},{
    timestamps: true
}
);
const usermodel=mongoose.model('user',Userschema);
export default usermodel;
