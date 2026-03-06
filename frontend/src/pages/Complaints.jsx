import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/complaints");
        setComplaints(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load complaints (Admin/Officer only)");
      }
    };

    load();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Gram Samasya" subtitle="Citizen grievance portal">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && complaints.length === 0 && (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No complaints found in database.</p>
        )}
        {complaints.map((complaint) => (
          <div key={complaint._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{complaint.issue || complaint.category}</p>
              <p className="text-xs text-slate-400">Category: {complaint.category}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {complaint.status}
            </span>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Resolution Workflow" subtitle="Officer assignment and follow-up">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Track complaint updates, internal notes, and citizen notifications in real time.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Assign officers, set deadlines, and generate analytics for recurring issues.
        </div>
      </SectionCard>
    </div>
  );
}
