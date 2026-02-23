import { AuditLog } from "../models/AuditLog.js";
import { logger } from "../utils/logger.js";

export const recordAudit = async (action, actorId, metadata = {}, req = null) => {
  try {
    await AuditLog.create({
      action,
      actor: actorId || null,
      ipAddress: req?.ip,
      userAgent: req?.headers["user-agent"],
      metadata
    });
  } catch (error) {
    logger.error("Failed to persist audit log", error);
  }

  logger.info(`AUDIT: ${action}`, { actorId, ...metadata });
};
