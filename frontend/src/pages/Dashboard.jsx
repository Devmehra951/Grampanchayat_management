import StatCard from "../components/StatCard.jsx";
import SectionCard from "../components/SectionCard.jsx";

const announcements = [
  "Durga Puja volunteer registration closes in 3 days.",
  "Ward 4 drainage repair approved for next week.",
  "Temple donation drive target set to ₹5,00,000."
];

const grievances = [
  { title: "Water supply interruption", status: "Assigned", officer: "Officer Das" },
  { title: "Street lighting issue", status: "In Progress", officer: "Officer Meena" },
  { title: "Garbage pickup delay", status: "Pending", officer: "Unassigned" }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Projects" value="18" helper="4 nearing completion" />
        <StatCard title="Total Donations (₹)" value="12.4L" helper="Updated today" />
        <StatCard title="Open Complaints" value="42" helper="12 high priority" />
        <StatCard title="Festival Events" value="6" helper="Next: Navratri" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Village Announcements" subtitle="Citizen-facing notices">
          {announcements.map((item) => (
            <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Grievance Tracker" subtitle="Latest citizen complaints">
          {grievances.map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-400">Assigned to {item.officer}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{item.status}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
