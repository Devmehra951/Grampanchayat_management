import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

export const buildDonationPdf = (donations) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.fontSize(18).text("Donation Report", { align: "center" });
  doc.moveDown();
  donations.forEach((donation) => {
    doc.fontSize(12).text(
      `${donation.donorName} | ₹${donation.amount} | ${donation.templeName} | ${donation.createdAt.toDateString()}`
    );
  });
  doc.end();
  return doc;
};

export const buildDonationExcel = async (donations) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Donations");
  sheet.columns = [
    { header: "Donor Name", key: "donorName" },
    { header: "Phone", key: "donorPhone" },
    { header: "Amount", key: "amount" },
    { header: "Temple", key: "templeName" },
    { header: "Created At", key: "createdAt" }
  ];
  donations.forEach((donation) => sheet.addRow(donation));
  return workbook;
};
