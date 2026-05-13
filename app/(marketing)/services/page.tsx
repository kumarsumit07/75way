import { BrainCircuit, Blocks, Code2, Globe2, Database } from "lucide-react";

const rows = [
  { Icon: BrainCircuit, title: "AI & automation", body: "Consulting, Gen AI, ML platforms, and agentic systems.", id: "ai" },
  { Icon: Code2, title: "Apps & software", body: "Mobile, web, SaaS, MVPs, and enterprise-grade releases.", id: "apps" },
  { Icon: Blocks, title: "Blockchain", body: "Smart contracts, DeFi surfaces, and tokenized workflows.", id: "chain" },
  { Icon: Globe2, title: "Web & IoT", body: "Connected products, dashboards, and real-time UX.", id: "web" },
  { Icon: Database, title: "CRM & analytics", body: "CRM build-outs, BI, and decision intelligence.", id: "crm" },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">Services</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">End-to-end product engineering</h1>
          <p className="mt-5 text-lg text-slate-600">One partner for strategy, design, build, launch, and iteration—with clear ownership and delivery cadence.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl space-y-6 px-5 py-16 lg:px-8">
        {rows.map(({ Icon, title, body, id }) => (
          <article key={id} id={id} className="flex flex-col gap-6 rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm md:flex-row md:items-start md:gap-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{title}</h2>
              <p className="mt-3 text-slate-600">{body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
