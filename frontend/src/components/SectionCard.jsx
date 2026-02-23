export default function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>
        </div>
        <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-200">
          View all
        </button>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
