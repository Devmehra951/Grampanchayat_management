import dotenv from "dotenv";

dotenv.config();

const rawOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173";

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/gram_panchayat",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "change_me_access",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "change_me_refresh",
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  clientOrigins: rawOrigins.split(",").map((origin) => origin.trim()).filter(Boolean)
};
