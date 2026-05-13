import Link from "next/link";
import { Bot } from "lucide-react";

const categories = ["Sales", "BPO / Support", "Legal", "HR", "Marketing", "Finance", "Operations", "Billing"];

export default function AiAgentsPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">Agent Store</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Intelligent agents for enterprise workflows</h1>
          <p className="mt-6 text-lg text-slate-600">
            Modular AI agents that plug into CRMs, support stacks, and internal tools—built for reliability, auditability, and scale.
          </p>
          <Link href="/#contact" className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
            Book a demo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="text-center text-2xl font-black text-slate-900 md:text-3xl">Functions we ship</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Bot className="h-6 w-6" />
              </div>
              <p className="font-bold text-slate-900">{c}</p>
              <p className="mt-2 text-sm text-slate-600">Workflow templates, guardrails, and observability tailored to your stack.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
