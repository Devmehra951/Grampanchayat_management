import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../services/tokenService.js";
import { recordAudit } from "../services/auditService.js";

export const registerCitizen = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const user = await User.create({ fullName, email, phone, password });
    recordAudit("REGISTER_CITIZEN", user.id, { email });
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { sub: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    user.refreshTokens.push(refreshToken);
    await user.save();
    recordAudit("LOGIN", user.id, { email });
    return res.json({ accessToken, refreshToken, role: user.role });
  } catch (error) {
    return next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.sub);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const payload = { sub: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    return res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.sub);
    if (user) {
      user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
      await user.save();
      recordAudit("LOGOUT", user.id);
    }
    return res.json({ message: "Logged out" });
  } catch (error) {
    return next(error);
  }
};
