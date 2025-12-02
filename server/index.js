import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import morgan from "morgan";
import expressWinston from "express-winston";

import resumeRoutes from "./src/routes/resume.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import { globalLimiter } from "./src/middlewares/rateLimiter.simple.js";
import { logger } from "./src/config/logger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use(globalLimiter);
// app.use(morgan("combined"));

// app.use(expressWinston.logger({
//   winstonInstance: logger,
//   meta: true,
//   expressFormat: true,
//   colorize: false
// }));




app.get("/", (req, res) => res.send("API Running"));


app.use("/api/resume", resumeRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
