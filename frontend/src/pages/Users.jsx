import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", role: "PANCHAYAT_OFFICER" });

  const load = async () => {
    try {
      const { data } = await apiClient.get("/users");
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load users");
    }
  };

  useEffect(() => { load(); }, []);

  const createStaff = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/users/staff", form);
      setForm({ fullName: "", email: "", phone: "", password: "", role: "PANCHAYAT_OFFICER" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create staff user");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="User Management" subtitle="Admin creates Officers/Admins">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {users.map((user) => (
          <div key={user._id || user.email} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.fullName}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">{user.isActive ? "Active" : "Inactive"}</span>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Create Staff User" subtitle="Role-based account provisioning">
        <form onSubmit={createStaff} className="space-y-3">
          <input className="w-full rounded border px-3 py-2" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} required />
          <input className="w-full rounded border px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <input className="w-full rounded border px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
          <input type="password" className="w-full rounded border px-3 py-2" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
          <select className="w-full rounded border px-3 py-2" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
            <option value="PANCHAYAT_OFFICER">Panchayat Officer</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="rounded bg-brand-600 px-4 py-2 text-white">Create Staff</button>
        </form>
      </SectionCard>
    </div>
  );
}
