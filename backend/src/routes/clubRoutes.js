import { Router } from "express";
import { createClub, deleteClub, listClubs, updateClub } from "../controllers/clubController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { validate } from "../middlewares/validate.js";
import { clubSchema } from "../validators/clubValidators.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.get("/", authenticate, listClubs);
router.post("/", authenticate, authorize(Roles.admin, Roles.officer), validate(clubSchema), createClub);
router.patch("/:id", authenticate, authorize(Roles.admin, Roles.officer), updateClub);
router.delete("/:id", authenticate, authorize(Roles.admin), deleteClub);

export default router;
