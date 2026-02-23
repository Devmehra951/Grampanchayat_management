import { Router } from "express";
import { createStaffUser, listUsers } from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { Roles } from "../utils/constants.js";
import { validate } from "../middlewares/validate.js";
import { createStaffSchema } from "../validators/userValidators.js";

const router = Router();

router.get("/", authenticate, authorize(Roles.admin), listUsers);
router.post("/staff", authenticate, authorize(Roles.admin), validate(createStaffSchema), createStaffUser);

export default router;
