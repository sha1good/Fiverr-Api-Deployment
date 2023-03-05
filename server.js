import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./route/auth.route.js";
import userRoute from "./route/user.route.js";
import gigRoute from "./route/gig.route.js";
import reviewRoute from "./route/review.route.js";
import orderRoute from "./route/order.route.js";
import conversationRoute from "./route/conversation.route.js";
import messageRoute from "./route/message.route.js";

const app = express();

dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });


app.use(
  cors({
    origin: "https://clone-fiverr-client-app01.onrender.com",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS","HEAD"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
