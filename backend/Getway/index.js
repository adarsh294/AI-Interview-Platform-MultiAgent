import express from "express";
import { config } from "dotenv";
import cors from "cors";
import pino from "pino";
import proxy from "express-http-proxy";
config();
const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
const logger = pino();
app.get("/",(req,res)=>{
    res.status(200).json({message:"getway is running"})
});
app.use("/api/auth",proxy("http://localhost:3001/"));

app.listen(process.env.PORT,()=>{
    logger.info(`server is running on port ${process.env.PORT}`);
});