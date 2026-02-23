import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRateLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import festivalRoutes from "./routes/festivalRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import developmentRoutes from "./routes/developmentRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import { env } from "./config/env.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(morgan("dev"));
  app.use(apiRateLimiter);

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/festivals", festivalRoutes);
  app.use("/api/donations", donationRoutes);
  app.use("/api/developments", developmentRoutes);
  app.use("/api/complaints", complaintRoutes);
  app.use("/api/clubs", clubRoutes);

  app.use(errorHandler);

  return app;
};
