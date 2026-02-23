import SectionCard from "../components/SectionCard.jsx";

const projects = [
  { name: "Ward 2 Road Repair", status: "Active", budget: "₹8,00,000" },
  { name: "Village Water Plant", status: "Pending", budget: "₹12,50,000" }
];

export default function Development() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Development Projects" subtitle="Infrastructure monitoring">
        {projects.map((project) => (
          <div key={project.name} className="rounded-lg border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{project.name}</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Budget: {project.budget}</p>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Resource Allocation" subtitle="Labor, material, and contractor tracking">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Capture progress photos, update stage-wise completion, and track contractor bills.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Keep audit-ready records for government approvals and fund releases.
        </div>
      </SectionCard>
    </div>
  );
}
