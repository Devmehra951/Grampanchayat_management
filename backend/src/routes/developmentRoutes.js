import { Router } from "express";
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject
} from "../controllers/developmentController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { validate } from "../middlewares/validate.js";
import { projectSchema } from "../validators/developmentValidators.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.get("/", authenticate, listProjects);
router.post("/", authenticate, authorize(Roles.admin, Roles.officer), validate(projectSchema), createProject);
router.patch("/:id", authenticate, authorize(Roles.admin, Roles.officer), updateProject);
router.delete("/:id", authenticate, authorize(Roles.admin, Roles.officer), deleteProject);

export default router;
