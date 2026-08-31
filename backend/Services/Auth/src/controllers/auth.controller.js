import usermodel from "../model/auth.model.js";
import { redisClient } from "../redis.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const register=async(req,res,next)=>{
    try {      
        const {username,email,password} = req.body;
        const find= await usermodel.findOne({
            $or:[{username},{email}]
        });
        if(find){
            return res.status(400).json({message:"username or email Already Exist"});
        }
        const hash=await bcrypt.hash(password,10);
        const data=await usermodel.create({username,email,password:hash});
              const refreshtoken=await jwt.sign({
              id:data._id
            },process.env.JWT_SECRET,{expiresIn:"7d"})
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge:1*24*60*60*1000
            });
                  const refreshtokenhash =crypto.createHash("sha256").update(refreshtoken).digest("hex");
           console.log(refreshtokenhash)
            await sessionmodel.create({
                userId:data._id,refreshtoken:refreshtokenhash,ip:req.ip,userAgent:req.headers['user-agent']
            })
            res.status(200).json({message:"user created successfully",data});
    } catch (e) {
       next(e); 
    }

};


export const login=async(req,res,next)=>{
    try {
        const {identifier,password}=req.body;

        const findone=await usermodel.findOne({$or:[{username:identifier},{email:identifier}]});
        if (!findone) {
            return res.status(400).json({message:"invalid username or email"});
        };
        const findpassword=await bcrypt.compare(password,findone.password);
        if (!findpassword) {
            return res.status(400).json({message:"invalid password"});
        };
              const refreshtoken=await jwt.sign({
              id:findone._id
            },process.env.JWT_SECRET,{expiresIn:"7d"})
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge:1*24*60*60*1000
            });

            const refreshtokenhash =crypto.createHash("sha256").update(refreshtoken).digest("hex");
            await sessionmodel.create({
                userId:findone._id,refreshtoken:refreshtokenhash,ip:req.ip,userAgent:req.headers['user-agent']
            })
            res.status(200).json({message:"user loggedin successfully",data:findone});
    } catch (err) {
        next(err);
    }
};


export const update= async (req,res,next)=>{
    try {
          const {username,email,password}=req.body;
        const findone=await usermodel.findOne({$or:[{username},{email}]});
        if (!findone) {
            return res.status(400).json({message:"invalid username or email"});
        };
         const tokenHash = await crypto.createHash("sha256").update(req.token).digest("hex");
        const session = await sessionmodel.findOne({userId:req.user, refreshtoken:tokenHash,revoke:false});
        if(!session){
              return res.status(401).json({message:"token revoked"});
        };
        const hashpass = await bcrypt.hash(password,10);
         const update=await usermodel.findOneAndUpdate({_id:req.user},{password:hashpass,username},{returnDocument:"after"});
         res.status(200).json({message:"user updated successfully",update});
    } catch (err) {
        next(err);
    }
};


export const logout = async (req,res,next) =>{
    try {
        if(!req.user){
            return res.status(401).json({message:"login first"});
        };
        const tokenHash = await crypto.createHash("sha256").update(req.token).digest("hex");
        await redisClient.set(`blacklist:${req.token}`,"true","EX",60 * 60 * 24);
       const update= await sessionmodel.findOneAndUpdate({userId:req.user, refreshtoken:tokenHash,revoke:false},{revoke:true},{returnDocument:"after"});
       if(!update){
        return res.status(400).json({message:"user not found"})
       }
        res.clearCookie("refreshtoken");
        res.status(200).json({message:"user loggedout successfully",update});
    } catch (err) {
        next(err);
    }
};


export const logoutAll = async (req,res,next) =>{
    try {
        await redisClient.set(`blacklist:${req.user}`,"true","EX",7 * 24 * 60 * 60);
        await sessionmodel.updateMany({userId:req.user,revoke:false},{revoke:true});
        res.clearCookie("refreshtoken");
        res.status(200).json({message:"user loggedout from All device"});
    } catch (err) {
        next(err);
    };
};


export const getme = async (req,res,next)=>{
    try {
        // const tokenHash = await crypto.createHash("sha256").update(req.token).digest("hex");
        // const loggedin=await sessionmodel.findOne({userId:req.user, refreshtoken:tokenHash,revoke:false});
        // if (!loggedin) {
        //     return res.status(401).json({message:"unauthorized user do login"});
        // };
        const finduser = await usermodel.findById(req.user);
        if (!finduser) {
            return res.status(404).json({message:"user not found"});
        };
        res.status(200).json({message:"user found successfully",finduser});
    } catch (err) {
        next(err);
    }
};
