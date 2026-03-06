import { Router } from "express";
import {
  createComplaint,
  listComplaints,
  updateComplaint
} from "../controllers/complaintController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { validate } from "../middlewares/validate.js";
import { complaintSchema } from "../validators/complaintValidators.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.get("/", authenticate, listComplaints);
router.post("/", authenticate, authorize(Roles.citizen), validate(complaintSchema), createComplaint);
router.patch("/:id", authenticate, authorize(Roles.admin, Roles.officer), updateComplaint);

export default router;
