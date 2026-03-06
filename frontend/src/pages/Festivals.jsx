import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

export default function Festivals() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/festivals");
        setEvents(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load festivals");
      }
    };

    load();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Festival Calendar" subtitle="Upcoming cultural programs">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && events.length === 0 && (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No festival events found in database.</p>
        )}
        {events.map((event) => (
          <div key={event._id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{event.name}</h3>
              <span className="text-xs text-brand-700">
                {new Date(event.startDate).toLocaleDateString("en-IN")} - {new Date(event.endDate).toLocaleDateString("en-IN")}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Budget: ₹{Number(event.budgetAllocated || 0).toLocaleString("en-IN")}</span>
              <span>Volunteers: {event.volunteers?.length || 0}</span>
            </div>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Volunteer Allocation" subtitle="Assign ward-wise volunteers">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Track volunteer roles, duty rosters, and daily check-ins for each festival club.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Maintain budget approvals and expense receipts for transparency.
        </div>
      </SectionCard>
    </div>
  );
}
