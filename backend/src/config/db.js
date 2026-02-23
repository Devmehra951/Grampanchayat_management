import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv !== "production"
    });
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    throw error;
  }
};
