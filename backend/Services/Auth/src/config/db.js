import mongoose from "mongoose";
import { config } from "./config.js";
import pino from "pino";

const logger = pino();

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    logger.info("Database has Connected");
  } catch (err) {
    logger.error({ err }, "Database Connection Failed");
    process.exit(1);
  }
};