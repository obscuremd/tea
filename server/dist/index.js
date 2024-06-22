"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const comment_1 = __importDefault(require("./routes/comment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8800;
const mongoUrl = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URL;
if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
}
// connect to mongoDB
mongoose_1.default.connect(mongoUrl);
// event handling if the connection is successful
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
// event handling if the connection fails
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("hello");
});
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/posts", post_1.default);
app.use("/api/comments", comment_1.default);
app.listen(PORT, () => {
    console.log("server running");
});
