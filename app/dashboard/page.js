'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="text-sm text-slate-300">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-100">Dashboard</h1>
      <p className="text-slate-300">Welcome, {user.email}!</p>
      <button
        type="button"
        onClick={logout}
        className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
      >
        Logout
      </button>
    </section>
  );
}
