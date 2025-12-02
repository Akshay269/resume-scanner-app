// src/middleware/rateLimiter.simple.js
import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});
