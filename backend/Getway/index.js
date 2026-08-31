import express from "express";
import { config } from "dotenv";
import pino from "pino";
config();
const app=express();
const logger = pino();
app.get("/",(req,res)=>{
    res.status(200).json({message:"getway is running"})
});

app.listen(process.env.PORT,()=>{
    logger.info(`server is running on port ${process.env.PORT}`);
});