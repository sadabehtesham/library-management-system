import express from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./database/db.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import expressFileupload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, "config", "config.env") });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
   origin: [process.env.FRONTEND_URL],
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials:true,
 })
);
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    req.body = req.body || {};
  }
  next();
});

app.use(expressFileupload({
  useTempFiles: true,
  tempFileDir:"/tmp/",
}))

app.use("/api/v1/auth", authRouter);
// http://localhost:4000/api/v1/auth/register

app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

connectDB();

// Start background jobs after DB connection attempt
notifyUsers();
removeUnverifiedAccounts();
app.use("/api", authRouter);
app.use(errorMiddleware);