import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

export default function Development() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/developments");
        setProjects(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load development projects");
      }
    };

    load();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Development Projects" subtitle="Infrastructure monitoring">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && projects.length === 0 && (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No development projects found in database.</p>
        )}
        {projects.map((project) => (
          <div key={project._id} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{project.name}</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Budget: ₹{Number(project.budget || 0).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Resource Allocation" subtitle="Labor, material, and contractor tracking">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Capture progress photos, update stage-wise completion, and track contractor bills.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Keep audit-ready records for government approvals and fund releases.
        </div>
      </SectionCard>
    </div>
  );
}
