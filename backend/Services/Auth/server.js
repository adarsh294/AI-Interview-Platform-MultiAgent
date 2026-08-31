import "./src/config/env.js";
import app from "./src/app.js";
import pino from "pino";
const logger = pino();

app.listen(process.env.PORT,()=>{
    logger.info(`server is started at http://localhost:${process.env.PORT}`)
});