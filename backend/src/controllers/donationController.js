import { v4 as uuidv4 } from "uuid";
import { Donation } from "../models/Donation.js";
import { buildDonationExcel, buildDonationPdf } from "../services/reportService.js";

export const createDonation = async (req, res, next) => {
  try {
    const receiptNumber = `DON-${uuidv4()}`;
    const donation = await Donation.create({
      ...req.body,
      receiptNumber,
      receivedBy: req.user?.id
    });
    return res.status(201).json(donation);
  } catch (error) {
    return next(error);
  }
};

export const listDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    return res.json(donations);
  } catch (error) {
    return next(error);
  }
};

export const exportDonationPdf = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=donations.pdf");
    const doc = buildDonationPdf(donations);
    doc.pipe(res);
  } catch (error) {
    return next(error);
  }
};

export const exportDonationExcel = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    const workbook = await buildDonationExcel(donations.map((donation) => donation.toObject()));
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=donations.xlsx");
    await workbook.xlsx.write(res);
  } catch (error) {
    return next(error);
  }
};
