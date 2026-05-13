const sectors = [
  { id: "healthcare", name: "Healthcare", points: ["Diagnostics copilots", "Telehealth UX", "CRM for care teams"] },
  { id: "fintech", name: "Fintech", points: ["Risk scoring", "Wallet & ledger UX", "Compliance tooling"] },
  { id: "education", name: "Education", points: ["Tutor copilots", "LMS integrations", "Virtual classrooms"] },
  { id: "ecommerce", name: "E-commerce", points: ["Recommendations", "Marketplace ops", "Fulfillment analytics"] },
];

export default function IndustriesPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">Industries</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">Where we deploy AI-first products</h1>
          <p className="mt-5 text-lg text-slate-600">Deep patterns per vertical—security models, integrations, and UX conventions included.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-2 lg:px-8">
        {sectors.map((s) => (
          <article key={s.id} id={s.id} className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">{s.name}</h2>
            <ul className="mt-5 space-y-3 text-slate-600">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
