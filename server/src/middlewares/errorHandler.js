// src/middleware/errorHandler.js
import { logger } from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === "production"
    ? "Internal server error"
    : err.message;

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};
