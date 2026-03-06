import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Roles, isAdminOrOfficer } from "../utils/roles.js";

const navigation = [
  { name: "Dashboard", path: "/dashboard", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Clubs", path: "/clubs", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Festivals", path: "/festivals", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Donations", path: "/donations", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Development", path: "/development", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Complaints", path: "/complaints", roles: [Roles.ADMIN, Roles.OFFICER, Roles.CITIZEN] },
  { name: "Users", path: "/users", roles: [Roles.ADMIN] }
];

export default function AppShell({ children }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const menu = navigation.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex">
        <aside className="min-h-screen w-64 bg-white px-6 py-8 shadow-xl dark:bg-slate-900">
          <div className="text-xl font-semibold text-brand-700">Gram Panchayat</div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Community Management</p>
          <p className="mt-2 text-xs text-slate-400">
            {isAdminOrOfficer(user?.role) ? "Admin/Officer Control Center" : "Citizen Service Portal"}
          </p>
          <nav className="mt-8 space-y-2">
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between bg-white px-8 py-6 shadow-sm dark:bg-slate-900">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t.adminCenter}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-300">{t.subtitle}</p>
              <p className="mt-1 text-xs text-slate-400">
                {user?.fullName} ({user?.role})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-700 dark:text-slate-200"
              >
                {language === "en" ? "हिन्दी" : "English"}
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-700 dark:text-slate-200"
              >
                {theme === "light" ? "Dark" : "Light"}
              </button>
              <button onClick={logout} className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white">
                {t.logout}
              </button>
            </div>
          </header>
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
