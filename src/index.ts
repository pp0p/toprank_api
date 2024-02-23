import express from "express";
import helmet from "helmet";
import db from "./config/db";
import cookieParser from "cookie-parser";
import router from "./Router/index";
import cors from "cors";
import { config } from "./config/config";
const app = express();

const port: number = config.port;
// connect to db
db();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(helmet());
app.use(cors(config.corsOption));

app.use(cookieParser());
// router

// app.use(errorMiddleware);
app.use("/", router);
app.use("*", (req, res) => {
  res.sendStatus(404);
});
app.listen(port, () => console.log(`Server run on port: ${port}`));
