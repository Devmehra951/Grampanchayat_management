import { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

const fallbackAnnouncements = [
  "Durga Puja volunteer registration closes in 3 days.",
  "Ward 4 drainage repair approved for next week.",
  "Temple donation drive target set to ₹5,00,000."
];

export default function Dashboard() {
  const [summary, setSummary] = useState({
    activeProjects: 0,
    donationTotal: 0,
    openComplaints: 0,
    users: 0,
    upcomingFestivals: []
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/dashboard/summary");
        setSummary(data);
      } catch (error) {
        // Keep fallback data if API is not available.
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Projects" value={summary.activeProjects} helper="Public works in progress" />
        <StatCard title="Total Donations (₹)" value={summary.donationTotal.toLocaleString("en-IN")} helper="Temple + festival collection" />
        <StatCard title="Open Complaints" value={summary.openComplaints} helper="Awaiting officer closure" />
        <StatCard title="Registered Users" value={summary.users} helper="Citizens + officers + admins" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Village Announcements" subtitle="Citizen-facing notices">
          {fallbackAnnouncements.map((item) => (
            <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {item}
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Upcoming Festivals" subtitle="Calendar from live records">
          {(summary.upcomingFestivals.length ? summary.upcomingFestivals : [{ name: "No upcoming festival", startDate: new Date(), endDate: new Date() }]).map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-400">{new Date(item.startDate).toLocaleDateString("en-IN")} - {new Date(item.endDate).toLocaleDateString("en-IN")}</p>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
