import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes/auth.router.js";
import { err } from "./middleware/err.middleware.js";
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/",router);
app.use(err);
export default app;