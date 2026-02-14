"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const verifyAuthentication = async () => {
      const token = localStorage.getItem("vornix_token");

      if (!token) {
        window.location.href = "/login";
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
          window.location.href = "/login";
          return;
        }

        if (isActive) {
          setIsLoading(false);
        }
      } catch {
        window.location.href = "/login";
      }
    };

    verifyAuthentication();

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="space-y-8">
        <article className="card">
          <p className="text-sm text-slate-300">Checking authentication...</p>
        </article>
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
