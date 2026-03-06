import { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer } from "../utils/roles.js";

const fallbackAnnouncements = [
  "Durga Puja volunteer registration closes in 3 days.",
  "Ward 4 drainage repair approved for next week.",
  "Temple donation drive target set to ₹5,00,000."
];

export default function Dashboard() {
  const { user } = useAuth();
  const enterpriseView = isAdminOrOfficer(user?.role);

  const [summary, setSummary] = useState({
    activeProjects: 0,
    donationTotal: 0,
    openComplaints: 0,
    users: 0,
    upcomingFestivals: [],
    participation: {
      citizens: 0,
      complaintParticipants: 0,
      donorParticipants: 0,
      clubParticipants: 0,
      festivalVolunteers: 0
    }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/dashboard/summary");
        setSummary(data);
      } catch (error) {
        // fallback state
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
        <StatCard title={enterpriseView ? "Registered Users" : "Community Citizens"} value={enterpriseView ? summary.users : summary.participation.citizens} helper={enterpriseView ? "Citizens + officers + admins" : "Village active users"} />
      </div>

      {enterpriseView && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Citizen Donors" value={summary.participation.donorParticipants} helper="Citizens contributed donations" />
          <StatCard title="Complaint Participants" value={summary.participation.complaintParticipants} helper="Citizens filed grievances" />
          <StatCard title="Club Participation" value={summary.participation.clubParticipants} helper="Total club memberships" />
          <StatCard title="Festival Volunteers" value={summary.participation.festivalVolunteers} helper="Citizen volunteer count" />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title={enterpriseView ? "Village Announcements" : "Citizen Noticeboard"} subtitle="Community updates">
          {fallbackAnnouncements.map((item) => (
            <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {item}
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Upcoming Festivals" subtitle="Calendar from live records">
          {(summary.upcomingFestivals.length
            ? summary.upcomingFestivals
            : [{ name: "No upcoming festival", startDate: new Date(), endDate: new Date() }]
          ).map((item) => (
            <div
              key={`${item.name}-${item.startDate}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-400">
                  {new Date(item.startDate).toLocaleDateString("en-IN")} - {new Date(item.endDate).toLocaleDateString("en-IN")}
                </p>
              </div>
              <span className="text-xs text-slate-500">Volunteers: {item.volunteers?.length || 0}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
