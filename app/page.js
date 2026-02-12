import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-6">
        <p className="inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-200">
          Fintech SaaS Platform
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
          Build financial clarity with a platform designed for modern operations.
        </h1>
        <p className="max-w-2xl text-base text-slate-300 md:text-lg">
          Vornix helps teams centralize evaluations, streamline account oversight, and elevate executive reporting in one secure workspace.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-400"
          >
            Enter Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {['Portfolio Intelligence', 'Risk Evaluation', 'Account Governance'].map((item) => (
          <article key={item} className="card">
            <h2 className="text-base font-semibold text-slate-100">{item}</h2>
            <p className="mt-2 text-sm text-slate-400">
              Structured modules ready for production integrations and secure financial workflows.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
