import SectionCard from "../components/SectionCard.jsx";

const donations = [
  { donor: "Ravi Sharma", amount: "₹5,000", temple: "Shiv Mandir", method: "Online" },
  { donor: "Neha Singh", amount: "₹1,200", temple: "Durga Mandir", method: "Cash" }
];

export default function Donations() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Recent Donations" subtitle="Temple & festival contributions">
        {donations.map((donation) => (
          <div key={donation.donor} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div>
              <p className="text-sm font-medium text-slate-800">{donation.donor}</p>
              <p className="text-xs text-slate-400">{donation.temple}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{donation.amount}</p>
              <p className="text-xs text-slate-500">{donation.method}</p>
            </div>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Donation Controls" subtitle="Issue receipts & export reports">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Generate PDF receipts, track donor history, and export monthly summaries to Excel.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Integrate Razorpay for online donations and validate cash entries with receipts.
        </div>
      </SectionCard>
    </div>
  );
}
