import dotenv from "dotenv";
import pino from "pino";
dotenv.config();
export const logger=pino();
logger.info(" Environment Loaded");