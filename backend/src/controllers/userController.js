import { User } from "../models/User.js";
import { Roles } from "../utils/constants.js";
import { recordAudit } from "../services/auditService.js";

export const createStaffUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    if (![Roles.admin, Roles.officer].includes(role)) {
      return res.status(400).json({ message: "Role must be ADMIN or PANCHAYAT_OFFICER" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ fullName, email, phone, password, role });
    await recordAudit("CREATE_STAFF_USER", req.user.id, { targetUser: user.id, role }, req);
    return res.status(201).json({ message: "Staff user created" });
  } catch (error) {
    return next(error);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -refreshTokens").sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};
