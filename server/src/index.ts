import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/post";
import commentRoute from "./routes/comment";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

const mongoUrl = process?.env?.MONGO_URL

if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not defined");
}

// connect to mongoDB
mongoose.connect(mongoUrl);

// event handling if the connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// event handling if the connection fails
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.listen(PORT, () => {
  console.log("server running");
});
