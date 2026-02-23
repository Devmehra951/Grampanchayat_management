export default function StatCard({ title, value, helper }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h3>
      <p className="mt-2 text-xs text-slate-400">{helper}</p>
    </div>
  );
}
