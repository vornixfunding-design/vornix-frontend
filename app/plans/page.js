"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const MODEL_GROUPS = ["1-Step", "2-Step", "3-Step"];

function formatCurrency(value) {
  const amount = Number(value ?? 0);

  if (Number.isNaN(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function normalizeModelType(modelType) {
  const value = String(modelType ?? "").toLowerCase();

  if (value.includes("1") || value.includes("one")) {
    return "1-Step";
  }

  if (value.includes("2") || value.includes("two")) {
    return "2-Step";
  }

  if (value.includes("3") || value.includes("three")) {
    return "3-Step";
  }

  return "1-Step";
}

function PlanCard({ plan, onSelect }) {
  const targets = Array.isArray(plan?.targets) ? plan.targets : [];
  const phaseCount = plan?.phase_count ?? plan?.phases ?? "N/A";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-cyan-500/60">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300">Account Size</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-100">{formatCurrency(plan?.account_size)}</h3>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
            {formatCurrency(plan?.price)}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <dt className="text-slate-400">Phase Count</dt>
            <dd className="mt-1 font-medium text-slate-100">{phaseCount}</dd>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <dt className="text-slate-400">Consistency Rule</dt>
            <dd className="mt-1 font-medium text-slate-100">{plan?.consistency_rule ?? 0}%</dd>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 col-span-2">
            <dt className="text-slate-400">Profit Split</dt>
            <dd className="mt-1 font-medium text-slate-100">{plan?.profit_split ?? 0}%</dd>
          </div>
        </dl>

        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-sm text-slate-400">Targets</p>
          {targets.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {targets.map((target, index) => (
                <li
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200"
                  key={`${plan?.id ?? plan?._id}-target-${index}`}
                >
                  {target}%
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No targets specified.</p>
          )}
        </div>

        <button
          className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          onClick={() => onSelect(plan)}
          type="button"
        >
          Select Plan
        </button>
      </div>
    </article>
  );
}

export default function PlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPlans() {
      try {
        setLoading(true);
        setError("");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
        }

        const response = await fetch(`${apiUrl}/api/plans`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to fetch plans. (${response.status})`);
        }

        const data = await response.json();
        const fetchedPlans = Array.isArray(data) ? data : data?.plans;

        setPlans(Array.isArray(fetchedPlans) ? fetchedPlans : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while loading plans.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();

    return () => {
      controller.abort();
    };
  }, []);

  const groupedPlans = useMemo(() => {
    const buckets = {
      "1-Step": [],
      "2-Step": [],
      "3-Step": [],
    };

    plans.forEach((plan) => {
      const group = normalizeModelType(plan?.model_type);
      buckets[group].push(plan);
    });

    return buckets;
  }, [plans]);

  const hasAnyPlans = MODEL_GROUPS.some((group) => groupedPlans[group].length > 0);

  const handleSelectPlan = (plan) => {
    const planId = plan?.id ?? plan?._id;

    if (!planId) {
      return;
    }

    router.push(`/dashboard/evaluation?plan=${encodeURIComponent(planId)}`);
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
          Pricing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50">Choose your challenge model</h1>
        <p className="max-w-3xl text-sm text-slate-400">
          Compare Vornix evaluation plans across account sizes, target rules, and payout splits. Select the model
          that matches your risk appetite and trading style.
        </p>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
          Loading plans...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-200">{error}</div>
      )}

      {!loading && !error && !hasAnyPlans && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
          No plans are currently available.
        </div>
      )}

      {!loading &&
        !error &&
        MODEL_GROUPS.map((group) =>
          groupedPlans[group].length > 0 ? (
            <div className="space-y-4" key={group}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-slate-100">{group}</h2>
                <span className="h-px flex-1 bg-slate-800" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {groupedPlans[group].map((plan) => (
                  <PlanCard key={plan?.id ?? plan?._id ?? `${group}-${plan?.account_size}-${plan?.price}`} onSelect={handleSelectPlan} plan={plan} />
                ))}
              </div>
            </div>
          ) : null
        )}
    </section>
  );
}
