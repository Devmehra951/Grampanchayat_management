import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer, Roles } from "../utils/roles.js";

export default function Clubs() {
  const { user } = useAuth();
  const canManage = isAdminOrOfficer(user?.role);
  const isCitizen = user?.role === Roles.CITIZEN;
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", description: "" });
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await apiClient.get("/clubs");
      setClubs(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load clubs");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/clubs", form);
      setForm({ name: "", type: "", description: "" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create club");
    }
  };

  const remove = async (id) => {
    try {
      await apiClient.delete(`/clubs/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete club");
    }
  };

  const join = async (id) => {
    try {
      await apiClient.post(`/clubs/${id}/join`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to join club");
    }
  };

  const leave = async (id) => {
    try {
      await apiClient.post(`/clubs/${id}/leave`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to leave club");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Community Clubs" subtitle="Festival, Mandir, and development groups">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {clubs.map((club) => {
          const joined = club.members?.includes(user?.id);
          return (
            <div key={club._id} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{club.name}</p>
                  <p className="text-xs text-slate-400">{club.type} • Members: {club.members?.length || 0}</p>
                </div>
                <div className="flex items-center gap-2">
                  {canManage && (
                    <button onClick={() => remove(club._id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                  )}
                  {isCitizen && (
                    joined ? (
                      <button onClick={() => leave(club._id)} className="rounded bg-slate-600 px-2 py-1 text-xs text-white">Leave</button>
                    ) : (
                      <button onClick={() => join(club._id)} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Join</button>
                    )
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">{club.description || "No description"}</p>
            </div>
          );
        })}
      </SectionCard>

      {canManage && (
        <SectionCard title="Create Club" subtitle="Admin/Officer operations">
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Club Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded border px-3 py-2" placeholder="Type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} required />
            <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            <button className="rounded bg-brand-600 px-4 py-2 text-white">Create Club</button>
          </form>
        </SectionCard>
      )}

      {isCitizen && (
        <SectionCard title="Participation Benefit" subtitle="Citizen engagement">
          <div className="rounded-lg bg-indigo-50 p-4 text-sm text-indigo-700">Join clubs to participate in village decisions, volunteer activities, and social programs.</div>
        </SectionCard>
      )}
    </div>
  );
}
