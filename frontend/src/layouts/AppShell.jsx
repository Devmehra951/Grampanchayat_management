import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", path: "/" },
  { name: "Festivals", path: "/festivals" },
  { name: "Donations", path: "/donations" },
  { name: "Development", path: "/development" },
  { name: "Complaints", path: "/complaints" },
  { name: "Users", path: "/users" }
];

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-xl min-h-screen px-6 py-8">
          <div className="text-xl font-semibold text-brand-700">Gram Panchayat</div>
          <p className="mt-2 text-sm text-slate-500">Community Management</p>
          <nav className="mt-8 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin Control Center</h1>
              <p className="text-sm text-slate-500">Monitor village services, funds, and grievances.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm">Hindi</button>
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white">Logout</button>
            </div>
          </header>
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
