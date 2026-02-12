export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Sign in to access the Vornix platform.</p>
      </div>

      <div className="card space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-brand-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-brand-400"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-400"
        >
          Sign In
        </button>
      </div>
    </section>
  );
}
