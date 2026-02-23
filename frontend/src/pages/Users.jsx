import SectionCard from "../components/SectionCard.jsx";

const users = [
  { name: "Amit Kumar", role: "Admin", status: "Active" },
  { name: "Pooja Singh", role: "Officer", status: "Active" },
  { name: "Ram Lal", role: "Citizen", status: "Pending" }
];

export default function Users() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="User Management" subtitle="Role-based access control">
        {users.map((user) => (
          <div key={user.name} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {user.status}
            </span>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Security Policies" subtitle="Admin oversight">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Enforce MFA, password rotation, and audit logs for privileged actions.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Maintain active sessions and revoke tokens for suspicious activity.
        </div>
      </SectionCard>
    </div>
  );
}
