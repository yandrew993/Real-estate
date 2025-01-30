import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import hotelRoute from "./routes/hotel.route.js"; // Import the hotel route

const prisma = new PrismaClient();

const app = express();
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:5173", // Add any other origins you want to allow
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
//app.use("/api/hotels", hotelRoute); // Use the hotel route

app.listen(3000, () => {
  console.log("Server is running!");
});
