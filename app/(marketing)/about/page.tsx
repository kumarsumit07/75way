import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">About us</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">Engineering studio for serious product teams</h1>
          <p className="mt-6 text-lg text-slate-600">
            BlueWay pairs senior engineers with product leads to ship AI, data, and full-stack experiences without hand-off thrash. We work US/EU hours with transparent milestones.
          </p>
        </div>
      </section>
      <section id="careers" className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <h2 className="text-2xl font-black text-slate-900">Careers</h2>
        <p className="mt-4 text-slate-600">We hire pragmatic builders across AI/ML, full-stack, mobile, and cloud. Send a portfolio link via the contact form.</p>
        <Link href="/#contact" className="mt-6 inline-block font-bold text-blue-700 hover:underline">
          Get in touch
        </Link>
      </section>
      <section id="partners" className="mx-auto max-w-3xl border-t border-blue-100 px-5 py-16 lg:px-8">
        <h2 className="text-2xl font-black text-slate-900">Partnerships</h2>
        <p className="mt-4 text-slate-600">Cloud providers, design studios, and systems integrators—we white-label or co-deliver depending on the program.</p>
      </section>
    </div>
  );
}
