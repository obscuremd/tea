import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user";
import postRoute from "./routes/post";
import commentRoute from "./routes/comment";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

const mongoUrl = process?.env?.MONGO_URL

if (!mongoUrl) { throw new Error("MONGO_URL environment variable is not defined"); }

// connect to mongoDB
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => { console.log("Connected to MongoDB"); });
mongoose.connection.on("error", (err) => { console.error("MongoDB connection error:", err); });

// middleware
app.use(express.json());
app.use(cors());

app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
      }
  }
}));


app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, () => {
  console.log("server running");
});
