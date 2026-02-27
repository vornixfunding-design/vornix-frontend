"use client";

const whyUsCards = [
  {
    title: "90–95% Payouts",
    description: "Highest payout tiers in the industry with bi-weekly withdrawals.",
  },
  {
    title: "No Time Limits",
    description: "Trade at your own pace. No forced deadlines. No pressure.",
  },
  {
    title: "Strict & Clean Rules",
    description: "5% daily drawdown, 10% max drawdown — applies to every plan.",
  },
];

const featureCards = [
  {
    title: "Ultra-fast Dashboard",
    description: "Track phases, risk metrics, and payouts in one clean control center.",
  },
  {
    title: "Transparent Conditions",
    description: "No hidden clauses, no copy-trading traps, no surprise restrictions.",
  },
  {
    title: "Built for Serious Traders",
    description: "Institutional feel, modern execution, and responsive support when it matters.",
  },
];

const modelCards = [
  { name: "1-Step", details: "10% target • Premium Fast-Track" },
  { name: "2-Step", details: "8% + 5% • Our main model" },
  { name: "3-Step", details: "8% + 6% + 4% • Cheapest starter" },
];

export default function HomePage() {
  return (
    <main className="space-y-24 pb-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32 text-center md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

        <div className="animate-fade-up relative">
          <h1 className="text-5xl font-bold text-white drop-shadow-xl md:text-6xl">Trade. Pass. Get Funded.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Vornix is the next-gen prop firm offering fast evaluation, high payouts, and strict transparency with zero
            hidden rules.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        </div>
      </section>

      {/* WHY CHOOSE VORNIX */}
      <section className="mx-auto max-w-6xl space-y-12 px-6 md:px-8">
        <h2 className="section-title text-center">Why Traders Choose Vornix</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {whyUsCards.map((card, idx) => (
            <div key={card.title} className="card hover-lift animate-fade-up" style={{ animationDelay: `${idx * 90}ms` }}>
              <h3 className="mb-2 text-xl font-semibold text-white">{card.title}</h3>
              <p className="text-slate-400">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl space-y-12 px-6 md:px-8">
        <h2 className="section-title text-center">Platform Features</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((feature, idx) => (
            <div key={feature.title} className="card hover-lift animate-fade-up" style={{ animationDelay: `${idx * 120}ms` }}>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
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
          {modelCards.map((model, idx) => (
            <a
              key={model.name}
              href="/plans"
              className="card hover-lift animate-fade-up cursor-pointer hover:border-cyan-500"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <h3 className="text-xl font-semibold">{model.name}</h3>
              <p className="mt-2 text-slate-400">{model.details}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 text-center md:px-8">
        <div className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-32 w-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="animate-fade-up relative">
          <h2 className="text-4xl font-bold text-white">Ready to Start Trading?</h2>
          <p className="mt-4 text-slate-400">Start your evaluation and join a new generation of funded traders.</p>

          <a
            href="/plans"
            className="glow-ring mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-900 transition hover:bg-cyan-400"
          >
            Start Now
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} Vornix Funding. All rights reserved.</footer>
    </main>
  );
}
