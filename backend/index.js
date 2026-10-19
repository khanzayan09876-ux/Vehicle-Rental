// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import dbConnection from "./DB/dbConnection.js";
// import userRoute from "./routes/user.route.js";
// import fleetRoute from "./routes/fleet.route.js";
// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// dbConnection();

// app.use("/user", userRoute);
// app.use("/fleet", fleetRoute);


// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });


import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import dbConnection from "./DB/dbConnection.js";
import userRoute from "./routes/user.route.js";
import fleetRoute from "./routes/fleet.route.js";
import exploreRoute from "./routes/explore.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// uploads folder na ho to bana do
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// IMPORTANT: images browser ko dene ke liye
app.use("/uploads", express.static(uploadsDir));

dbConnection();

app.use("/user", userRoute);
app.use("/fleet", fleetRoute);
app.use("/explore", exploreRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});