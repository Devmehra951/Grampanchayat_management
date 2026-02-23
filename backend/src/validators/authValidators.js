import Joi from "joi";
import { Roles } from "../utils/constants.js";

const emailSchema = Joi.string().email({ tlds: { allow: false } });

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: emailSchema.required(),
  phone: Joi.string().min(8).required(),
  password: Joi.string().min(8).required()
});

export const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: Joi.string().required(),
  role: Joi.string().valid(...Object.values(Roles)).optional()
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
});
