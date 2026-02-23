import SectionCard from "../components/SectionCard.jsx";

const events = [
  {
    name: "Durga Puja",
    date: "12 Oct - 20 Oct",
    budget: "₹3,50,000",
    volunteers: 42
  },
  {
    name: "Ganesh Chaturthi",
    date: "6 Sep - 15 Sep",
    budget: "₹2,10,000",
    volunteers: 30
  }
];

export default function Festivals() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Festival Calendar" subtitle="Upcoming cultural programs">
        {events.map((event) => (
          <div key={event.name} className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">{event.name}</h3>
              <span className="text-xs text-brand-700">{event.date}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Budget: {event.budget}</span>
              <span>Volunteers: {event.volunteers}</span>
            </div>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Volunteer Allocation" subtitle="Assign ward-wise volunteers">
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Track volunteer roles, duty rosters, and daily check-ins for each festival club.
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Maintain budget approvals and expense receipts for transparency.
        </div>
      </SectionCard>
    </div>
  );
}
