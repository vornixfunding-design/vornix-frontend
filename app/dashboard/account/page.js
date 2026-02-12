export default function DashboardAccountPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="page-title">Account Center</h1>
        <p className="page-subtitle">
          Manage account-level details, security controls, and administrative access settings.
        </p>
      </div>

      <article className="card">
        <h2 className="text-base font-semibold text-slate-100">Account Management</h2>
        <p className="mt-2 text-sm text-slate-400">
          Foundational scaffolding is in place for authentication, profiles, and billing integrations.
        </p>
      </article>
    </section>
  );
}
