import { Router } from "express";
import {
  createDonation,
  exportDonationExcel,
  exportDonationPdf,
  listDonations
} from "../controllers/donationController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { validate } from "../middlewares/validate.js";
import { donationSchema } from "../validators/donationValidators.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.get("/", authenticate, listDonations);
router.post(
  "/",
  authenticate,
  authorize(Roles.admin, Roles.officer, Roles.citizen),
  validate(donationSchema),
  createDonation
);
router.get("/export/pdf", authenticate, authorize(Roles.admin, Roles.officer), exportDonationPdf);
router.get("/export/excel", authenticate, authorize(Roles.admin, Roles.officer), exportDonationExcel);

export default router;
