"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enforceAuthentication = async () => {
      const token = localStorage.getItem("vornix_token");

      if (!token) {
        window.location.replace("/login");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("vornix_token");
          window.location.replace("/login");
          return;
        }

        setLoading(false);
      } catch {
        localStorage.removeItem("vornix_token");
        window.location.replace("/login");
      }
    };

    enforceAuthentication();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4 shadow-lg">
          <p className="text-sm font-medium text-slate-200">Authenticating...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Your operational command center for monitoring activity across the Vornix platform.
        </p>
      </div>

      <article className="card">
        <h2 className="text-lg font-semibold text-slate-100">System Health</h2>
        <p className="mt-2 text-sm text-slate-300">Backend Status: Connected ✅</p>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="card">
          <h2 className="text-lg font-semibold text-slate-100">Evaluation Workspace</h2>
          <p className="mt-2 text-sm text-slate-400">
            Move into the evaluation module to review profiles and manage verification workflows.
          </p>
          <Link href="/dashboard/evaluation" className="mt-4 inline-block text-sm text-brand-300 hover:text-brand-200">
            Open evaluation
          </Link>
        </article>

        <article className="card">
          <h2 className="text-lg font-semibold text-slate-100">Account Oversight</h2>
          <p className="mt-2 text-sm text-slate-400">
            Access account-level controls, permissions, and profile maintenance from a single panel.
          </p>
          <Link href="/dashboard/account" className="mt-4 inline-block text-sm text-brand-300 hover:text-brand-200">
            Open account center
          </Link>
        </article>
      </div>
    </section>
  );
}
