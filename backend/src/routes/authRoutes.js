import { Router } from "express";
import { login, logout, refresh, registerCitizen } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, refreshSchema, registerSchema } from "../validators/authValidators.js";

const router = Router();

router.post("/register", validate(registerSchema), registerCitizen);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", validate(refreshSchema), logout);

export default router;
