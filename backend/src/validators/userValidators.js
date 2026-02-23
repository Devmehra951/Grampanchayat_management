import Joi from "joi";
import { Roles } from "../utils/constants.js";

export const createStaffSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid(Roles.admin, Roles.officer).required()
});
