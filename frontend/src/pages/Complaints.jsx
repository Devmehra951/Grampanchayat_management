import SectionCard from "../components/SectionCard.jsx";

const complaints = [
  { citizen: "Sunita Devi", issue: "Drainage blockage", status: "Assigned" },
  { citizen: "Rahul Gupta", issue: "Electricity outage", status: "In Progress" },
  { citizen: "Maya Roy", issue: "Garbage pickup", status: "Pending" }
];

export default function Complaints() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Gram Samasya" subtitle="Citizen grievance portal">
        {complaints.map((complaint) => (
          <div key={complaint.citizen} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{complaint.issue}</p>
              <p className="text-xs text-slate-400">Filed by {complaint.citizen}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {complaint.status}
            </span>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Resolution Workflow" subtitle="Officer assignment and follow-up">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Track complaint updates, internal notes, and citizen notifications in real time.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Assign officers, set deadlines, and generate analytics for recurring issues.
        </div>
      </SectionCard>
    </div>
  );
}
