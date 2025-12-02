// src/middleware/security.js
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

export const setupSecurity = (app) => {
  app.use(helmet({
    contentSecurityPolicy: false // or configure CSP properly for frontend
  }));

  // Basic CORS - tighten by setting origin to your frontend URL in production
  app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }));

  app.use(compression());
};
