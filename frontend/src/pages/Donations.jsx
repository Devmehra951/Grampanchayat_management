import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/donations");
        setDonations(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load donations (Admin/Officer only)");
      }
    };

    load();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Recent Donations" subtitle="Temple & festival contributions">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && donations.length === 0 && (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No donation records found in database.</p>
        )}
        {donations.map((donation) => (
          <div key={donation._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{donation.donorName}</p>
              <p className="text-xs text-slate-400">{donation.templeName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">₹{Number(donation.amount || 0).toLocaleString("en-IN")}</p>
              <p className="text-xs text-slate-500">{donation.method}</p>
            </div>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Donation Controls" subtitle="Issue receipts & export reports">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Generate PDF receipts, track donor history, and export monthly summaries to Excel.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Integrate Razorpay for online donations and validate cash entries with receipts.
        </div>
      </SectionCard>
    </div>
  );
}
