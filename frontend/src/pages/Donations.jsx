import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer } from "../utils/roles.js";

export default function Donations() {
  const { user } = useAuth();
  const canManage = isAdminOrOfficer(user?.role);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ donorName: "", donorPhone: "", amount: 0, method: "CASH", templeName: "", festivalOrEvent: "" });

  const load = async () => {
    try {
      const { data } = await apiClient.get("/donations");
      setDonations(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load donations");
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/donations", form);
      setForm({ donorName: "", donorPhone: "", amount: 0, method: "CASH", templeName: "", festivalOrEvent: "" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create donation");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Recent Donations" subtitle={canManage ? "All collections" : "My donation history"}>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && donations.length === 0 && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No donation records found.</p>}
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

      <SectionCard title={canManage ? "Donation CRUD" : "Make a Donation"} subtitle="Add donation entry">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full rounded border px-3 py-2" placeholder="Donor Name" value={form.donorName} onChange={(e) => setForm((p) => ({ ...p, donorName: e.target.value }))} required />
          <input className="w-full rounded border px-3 py-2" placeholder="Donor Phone" value={form.donorPhone} onChange={(e) => setForm((p) => ({ ...p, donorPhone: e.target.value }))} required />
          <input type="number" className="w-full rounded border px-3 py-2" placeholder="Amount" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: Number(e.target.value) }))} required />
          <input className="w-full rounded border px-3 py-2" placeholder="Temple Name" value={form.templeName} onChange={(e) => setForm((p) => ({ ...p, templeName: e.target.value }))} required />
          <input className="w-full rounded border px-3 py-2" placeholder="Festival/Event" value={form.festivalOrEvent} onChange={(e) => setForm((p) => ({ ...p, festivalOrEvent: e.target.value }))} />
          <select className="w-full rounded border px-3 py-2" value={form.method} onChange={(e) => setForm((p) => ({ ...p, method: e.target.value }))}>
            <option value="CASH">Cash</option>
            <option value="ONLINE">Online</option>
          </select>
          <button className="rounded bg-brand-600 px-4 py-2 text-white">Save Donation</button>
        </form>
      </SectionCard>
    </div>
  );
}
