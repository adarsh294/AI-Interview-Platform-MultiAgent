import mongoose from "mongoose";
  
const Userschema= new mongoose.Schema({
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
    password:{
        type:String,
        required:[true,'password is required'],
        trim:true
    }
}, {
    timestamps: true
}
);
const usermodel=mongoose.model('user',Userschema);
export default usermodel;
