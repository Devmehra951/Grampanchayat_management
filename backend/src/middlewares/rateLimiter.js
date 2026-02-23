import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests, please try again later."
});
