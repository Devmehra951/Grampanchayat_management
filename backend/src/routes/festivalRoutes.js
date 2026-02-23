import { Router } from "express";
import { createFestival, deleteFestival, listFestivals, updateFestival } from "../controllers/festivalController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { validate } from "../middlewares/validate.js";
import { festivalSchema } from "../validators/festivalValidators.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.get("/", listFestivals);
router.post("/", authenticate, authorize(Roles.admin, Roles.officer), validate(festivalSchema), createFestival);
router.patch("/:id", authenticate, authorize(Roles.admin, Roles.officer), updateFestival);
router.delete("/:id", authenticate, authorize(Roles.admin), deleteFestival);

export default router;
