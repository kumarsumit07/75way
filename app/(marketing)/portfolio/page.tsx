import Link from "next/link";

const items = [
  { title: "AI customer proof engine", tag: "AI", metric: "+35% conversions" },
  { title: "DeFi lending workspace", tag: "Blockchain", metric: "+60% ops efficiency" },
  { title: "IoT training control suite", tag: "IoT", metric: "1200+ sessions" },
  { title: "Healthcare engagement hub", tag: "Healthcare", metric: "+62% workflow" },
];

export default function PortfolioPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">Portfolio</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">Selected delivery patterns</h1>
          <p className="mt-5 text-lg text-slate-600">Product-grade builds across AI, Web3, IoT, and regulated industries—each tuned for measurable outcomes.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-2 lg:px-8">
        {items.map((p) => (
          <article key={p.title} className="group rounded-[2rem] border border-blue-100 bg-white p-8 shadow-md transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">{p.tag}</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">{p.title}</h2>
            <p className="mt-6 text-3xl font-black text-blue-700">{p.metric}</p>
            <Link href="/#case-studies" className="mt-8 inline-block font-bold text-blue-700 underline-offset-4 hover:underline">
              View narrative
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
