'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const { error: signUpError } = await signUp(email, password, fullName);

    if (signUpError) {
      setError(signUpError.message || 'Unable to create account. Please try again.');
      return;
    }

    setMessage('Check your email for the confirmation link!');
    router.prefetch('/login');
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <h1 className="mb-6 text-3xl font-semibold text-white">Create account</h1>

      {error ? (
        <p className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          {message}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm text-slate-300">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full rounded-md border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-cyan-500 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
        >
          Sign up
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
          Log in
        </Link>
      </p>
    </section>
  );
}
