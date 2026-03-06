import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer } from "../utils/roles.js";

export default function Development() {
  const { user } = useAuth();
  const canManage = isAdminOrOfficer(user?.role);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", category: "", budget: 0, startDate: "", status: "PENDING" });

  const load = async () => {
    try {
      const { data } = await apiClient.get("/developments");
      setProjects(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load development projects");
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try { await apiClient.post("/developments", form); setForm({ name: "", category: "", budget: 0, startDate: "", status: "PENDING" }); load(); }
    catch (err) { setError(err?.response?.data?.message || "Create project failed"); }
  };

  const remove = async (id) => {
    try { await apiClient.delete(`/developments/${id}`); load(); }
    catch (err) { setError(err?.response?.data?.message || "Delete project failed"); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Development Projects" subtitle="Infrastructure monitoring">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && projects.length === 0 && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No development projects found in database.</p>}
        {projects.map((project) => (
          <div key={project._id} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{project.name}</p>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">{project.status}</span>
                {canManage && <button onClick={() => remove(project._id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>}
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Budget: ₹{Number(project.budget || 0).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </SectionCard>

      {canManage && (
        <SectionCard title="Project CRUD" subtitle="Add development work">
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Project Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded border px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required />
            <input type="number" className="w-full rounded border px-3 py-2" placeholder="Budget" value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: Number(e.target.value) }))} required />
            <input type="date" className="w-full rounded border px-3 py-2" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} required />
            <button className="rounded bg-brand-600 px-4 py-2 text-white">Create Project</button>
          </form>
        </SectionCard>
      )}
    </div>
  );
}
