import Link from "next/link";

const blocks = [
  { id: "blogs", title: "Blogs", desc: "Playbooks on AI adoption, delivery models, and platform choices." },
  { id: "videos", title: "Videos", desc: "Short walkthroughs of architecture patterns and product teardowns." },
  { id: "case-studies", title: "Case studies", desc: "Outcome-focused narratives with metrics and tech stacks." },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">Resources</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">Learn how we ship</h1>
          <p className="mt-5 text-lg text-slate-600">Practical content for founders, CTOs, and product leaders evaluating AI and platform investments.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <article key={b.id} id={b.id} className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm transition hover:border-blue-300">
              <h2 className="text-xl font-black text-slate-900">{b.title}</h2>
              <p className="mt-3 text-slate-600">{b.desc}</p>
              <Link href="/#contact" className="mt-6 inline-block text-sm font-bold text-blue-700 hover:underline">
                Notify me
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
