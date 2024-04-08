import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./db/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import path from "path"
const app = express();
dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"/client","dist","index.html"))
})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
