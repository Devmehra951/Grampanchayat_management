import { logger } from "../utils/logger.js";

export const recordAudit = (action, actorId, metadata = {}) => {
  logger.info(`AUDIT: ${action}`, { actorId, ...metadata });
};
