"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHealth } from "@/lib/api";

export default function DashboardPage() {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    getHealth()
      .then(() => {
        if (isMounted) {
          setBackendStatus("connected");
        }
      })
      .catch(() => {
        if (isMounted) {
          setBackendStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const statusMessage =
    backendStatus === "connected"
      ? "Backend Status: Connected ✅"
      : backendStatus === "error"
        ? "Backend Status: Error ❌"
        : "Backend Status: Checking...";

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
        <p className="mt-2 text-sm text-slate-300">{statusMessage}</p>
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
