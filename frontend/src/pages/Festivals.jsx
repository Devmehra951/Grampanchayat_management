import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdminOrOfficer, Roles } from "../utils/roles.js";

export default function Festivals() {
  const { user } = useAuth();
  const canManage = isAdminOrOfficer(user?.role);
  const isCitizen = user?.role === Roles.CITIZEN;
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", festivalType: "", startDate: "", endDate: "", budgetAllocated: 0 });

  const load = async () => {
    try {
      const { data } = await apiClient.get("/festivals");
      setEvents(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load festivals");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/festivals", form);
      setForm({ name: "", festivalType: "", startDate: "", endDate: "", budgetAllocated: 0 });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create festival");
    }
  };

  const remove = async (id) => {
    try { await apiClient.delete(`/festivals/${id}`); load(); } catch (err) { setError(err?.response?.data?.message || "Delete failed"); }
  };

  const volunteer = async (id) => {
    try { await apiClient.post(`/festivals/${id}/volunteer`); load(); } catch (err) { setError(err?.response?.data?.message || "Volunteer failed"); }
  };

  const withdraw = async (id) => {
    try { await apiClient.post(`/festivals/${id}/withdraw`); load(); } catch (err) { setError(err?.response?.data?.message || "Withdraw failed"); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Festival Calendar" subtitle="Upcoming cultural programs">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!error && events.length === 0 && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">No festival events found in database.</p>}
        {events.map((event) => {
          const joined = event.volunteers?.includes(user?.id);
          return (
            <div key={event._id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{event.name}</h3>
                <div className="flex items-center gap-2">
                  {canManage && <button onClick={() => remove(event._id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>}
                  {isCitizen && (joined ? <button onClick={() => withdraw(event._id)} className="rounded bg-slate-600 px-2 py-1 text-xs text-white">Withdraw</button> : <button onClick={() => volunteer(event._id)} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Volunteer</button>)}
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500">{event.festivalType} | ₹{Number(event.budgetAllocated || 0).toLocaleString("en-IN")} | Volunteers: {event.volunteers?.length || 0}</div>
            </div>
          );
        })}
      </SectionCard>

      {canManage && (
        <SectionCard title="Festival CRUD" subtitle="Create festival events">
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded border px-3 py-2" placeholder="Festival Type" value={form.festivalType} onChange={(e) => setForm((p) => ({ ...p, festivalType: e.target.value }))} required />
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="w-full rounded border px-3 py-2" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} required />
              <input type="date" className="w-full rounded border px-3 py-2" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} required />
            </div>
            <input type="number" className="w-full rounded border px-3 py-2" placeholder="Budget" value={form.budgetAllocated} onChange={(e) => setForm((p) => ({ ...p, budgetAllocated: Number(e.target.value) }))} />
            <button className="rounded bg-brand-600 px-4 py-2 text-white">Create Festival</button>
          </form>
        </SectionCard>
      )}

      {isCitizen && (
        <SectionCard title="Citizen Participation" subtitle="Festival volunteering">
          <div className="rounded-lg bg-indigo-50 p-4 text-sm text-indigo-700">Volunteer in festivals to support local cultural activities and improve village participation metrics.</div>
        </SectionCard>
      )}
    </div>
  );
}
