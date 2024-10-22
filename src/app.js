import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/index.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// route imports
import router from "./routes/routes.js";


// routes declartion
app.use("/api/v1", router);

app.use(errorHandler);

export default app;