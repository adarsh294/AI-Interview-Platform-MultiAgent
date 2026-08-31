
import jwt from "jsonwebtoken";
import usermodel from "../model/auth.model.js";
import { config } from "../config/config.js";
export const userauth=async(req,res,next)=>{
 try {
    const token =req.cookies.refreshtoken;
    if (!token) {
    return res.status(401).json({message:"unauthorized user"})
}
    const data=jwt.verify(token,config.JWT_SECRET);
    if (!data) {
        return res.status(404).json({message:"user not found"})
    };
    const userdata=await usermodel.findById(data.id);
    if (!userdata) {
        return res.status(404).json({message:"login first"});
    };
  req.user=data.id;
  req.token=token;
  next();
 } catch (err) {
    next(err)
 };
};