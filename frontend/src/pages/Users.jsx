import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiClient } from "../utils/api.js";

const fallbackUsers = [
  { fullName: "Amit Kumar", role: "ADMIN", isActive: true },
  { fullName: "Pooja Singh", role: "PANCHAYAT_OFFICER", isActive: true },
  { fullName: "Ram Lal", role: "CITIZEN", isActive: false }
];

export default function Users() {
  const [users, setUsers] = useState(fallbackUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await apiClient.get("/users");
        setUsers(data);
      } catch (error) {
        // Keep fallback data for non-admin/testing mode.
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="User Management" subtitle="Role-based access control">
        {users.map((user) => (
          <div key={user.fullName} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.fullName}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Security Policies" subtitle="Admin oversight">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Enforce MFA, password rotation, and audit logs for privileged actions.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          Maintain active sessions and revoke tokens for suspicious activity.
        </div>
      </SectionCard>
    </div>
  );
}
