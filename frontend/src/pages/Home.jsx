import { Link } from "react-router-dom";

const features = [
  "Role-wise dashboard for Admin, Officer and Citizen",
  "Real-time clubs, festivals, development and complaint management",
  "Donation workflow with collection tracking and exports",
  "Secure JWT auth with RBAC and audit-ready APIs"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <h1 className="text-xl font-bold text-indigo-700">Gram Panchayat SaaS</h1>
        <div className="flex gap-3">
          <Link to="/login" className="rounded-lg border border-indigo-200 px-4 py-2 text-sm text-indigo-700">Login</Link>
          <Link to="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">Register</Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <section>
          <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">Industrial SaaS Model</p>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900">Digital Panchayat Operations Platform</h2>
          <p className="mt-4 text-slate-600">Manage governance, citizen services, grievances, donations, projects, and community participation from one role-based control center.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/login" className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Go to Dashboard</Link>
            <a href="#modules" className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Explore Modules</a>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900">Why this project is ready-to-use</h3>
          <div className="mt-4 space-y-3">
            {features.map((item) => (
              <div key={item} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </section>
      </main>

      <section id="modules" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Clubs & Festivals",
            "Development Projects",
            "Complaints & Resolution",
            "Donations & Collections"
          ].map((card) => (
            <div key={card} className="rounded-xl bg-white p-5 shadow-md">
              <h4 className="font-semibold text-slate-900">{card}</h4>
              <p className="mt-2 text-sm text-slate-600">Live APIs + role-based operations with secure access.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
