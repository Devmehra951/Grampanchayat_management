export default function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600">
          View all
        </button>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
