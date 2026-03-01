'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingSignupEmail');

    if (pendingEmail) {
      setEmail(pendingEmail);
      setStep('otp');
    }
  }, []);

  async function handleSignup(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed.');
      }

      localStorage.setItem('pendingSignupEmail', email);
      setStep('otp');
      setMessage('Registration successful. Please verify your email with the OTP.');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'OTP verification failed.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      localStorage.removeItem('pendingSignupEmail');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleResendOtp() {
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to resend OTP.');
      }

      setMessage('A new OTP has been sent to your email.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-100">Sign Up</h1>
        <p className="text-sm text-slate-400">Create your account to get started.</p>
      </div>

      {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{error}</p> : null}
      {message ? (
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{message}</p>
      ) : null}

      {step === 'signup' ? (
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="space-y-1">
            <label className="block text-sm text-slate-300" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Create account
          </button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleVerifyOtp}>
          <p className="text-sm text-slate-300">OTP sent to {email}</p>
          <div className="space-y-1">
            <label className="block text-sm text-slate-300" htmlFor="otp">
              OTP (6 digits)
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="\\d{6}"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Verify OTP
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Resend OTP
          </button>
        </form>
      )}

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-400 hover:text-brand-300">
          Login
        </Link>
      </p>
    </section>
  );
}
