import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer } from "../utils/roles.js";

export default function Complaints() {
  const { user } = useAuth();
  const canManage = isAdminOrOfficer(user?.role);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ category: "", description: "" });

  const load = async () => {
    try {
      const { data } = await apiClient.get("/complaints");
      setComplaints(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load complaints");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/complaints", form);
      setForm({ category: "", description: "" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to submit complaint");
    }
  };

  const setResolved = async (id) => {
    try {
      await apiClient.patch(`/complaints/${id}`, { status: "RESOLVED" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update complaint");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Gram Samasya" subtitle={canManage ? "All complaints" : "My complaints"}>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && complaints.length === 0 && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No complaints found.</p>}
        {complaints.map((complaint) => (
          <div key={complaint._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{complaint.description}</p>
              <p className="text-xs text-slate-400">Category: {complaint.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">{complaint.status}</span>
              {canManage && complaint.status !== "RESOLVED" && <button onClick={() => setResolved(complaint._id)} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Resolve</button>}
            </div>
          </div>
        ))}
      </SectionCard>

      <SectionCard title={canManage ? "Citizen Submission View" : "Register Complaint"} subtitle={canManage ? "Officers/Admin resolve workflow" : "Track your grievance status"}>
        {canManage ? (
          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">Use Resolve button to close complaints after field verification.</div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Category (water, roads, health...)" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required />
            <textarea className="w-full rounded border px-3 py-2" placeholder="Describe your issue" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
            <button className="rounded bg-brand-600 px-4 py-2 text-white">Submit Complaint</button>
          </form>
        )}
      </SectionCard>
    </div>
  );
}
