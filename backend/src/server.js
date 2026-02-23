import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const start = async () => {
  await connectDatabase();
  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`);
  });
};

start();
