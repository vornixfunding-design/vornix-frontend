"use client";

export default function HomePage() {
  return (
    <main className="space-y-24 pb-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[110px]" />

        <h1 className="relative text-5xl font-bold text-white drop-shadow-xl md:text-6xl">
          Trade. Pass. Get Funded.
        </h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Vornix is the next-gen prop firm offering fast evaluation, high payouts, and strict transparency with zero
          hidden rules.
        </p>

        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/plans"
            className="glow-ring rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Get Funded
          </a>
          <a
            href="/login"
            className="rounded-xl border border-slate-700 px-6 py-3 text-white transition hover:border-cyan-400"
          >
            Login
          </a>
        </div>
      </section>

      {/* WHY CHOOSE VORNIX */}
      <section className="mx-auto max-w-6xl space-y-12 px-6 md:px-8">
        <h2 className="section-title text-center">Why Traders Choose Vornix</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card hover-lift">
            <h3 className="mb-2 text-xl font-semibold text-white">90–95% Payouts</h3>
            <p className="text-slate-400">Highest payout tiers in the industry with bi-weekly withdrawals.</p>
          </div>

          <div className="card hover-lift">
            <h3 className="mb-2 text-xl font-semibold text-white">No Time Limits</h3>
            <p className="text-slate-400">Trade at your own pace. No forced deadlines. No pressure.</p>
          </div>

          <div className="card hover-lift">
            <h3 className="mb-2 text-xl font-semibold text-white">Strict &amp; Clean Rules</h3>
            <p className="text-slate-400">5% daily drawdown, 10% max drawdown — applies to every plan.</p>
          </div>
        </div>
      </section>

      {/* ACCOUNT MODELS */}
      <section className="mx-auto max-w-6xl space-y-6 px-6 md:px-8">
        <h2 className="section-title text-center">Evaluation Models</h2>
        <p className="mx-auto max-w-2xl text-center text-slate-400">
          Choose between 1-Step, 2-Step, or 3-Step challenges. Designed for every trading style — from fast-track to
          affordable entry.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a href="/plans" className="card hover-lift cursor-pointer hover:border-cyan-500">
            <h3 className="text-xl font-semibold">1-Step</h3>
            <p className="mt-2 text-slate-400">10% target • Premium Fast-Track</p>
          </a>

          <a href="/plans" className="card hover-lift cursor-pointer hover:border-cyan-500">
            <h3 className="text-xl font-semibold">2-Step</h3>
            <p className="mt-2 text-slate-400">8% + 5% • Our main model</p>
          </a>

          <a href="/plans" className="card hover-lift cursor-pointer hover:border-cyan-500">
            <h3 className="text-xl font-semibold">3-Step</h3>
            <p className="mt-2 text-slate-400">8% + 6% + 4% • Cheapest starter</p>
          </a>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 text-center md:px-8">
        <h2 className="text-4xl font-bold text-white">Ready to Start Trading?</h2>
        <p className="mt-4 text-slate-400">Start your evaluation and join a new generation of funded traders.</p>

        <a
          href="/plans"
          className="glow-ring mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-900 transition hover:bg-cyan-400"
        >
          Start Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} Vornix Funding. All rights reserved.</footer>
    </main>
  );
}
