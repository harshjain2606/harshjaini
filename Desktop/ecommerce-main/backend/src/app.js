import express from "express";
import cors from "cors";
import cookieParsor from "cookie-parser";


const app = express();

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'));
app.use(cookieParsor());

// routes
import productRouter from "./routes/product.routes.js"

app.use("/api/v1/product", productRouter);


export {app}