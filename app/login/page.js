'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { sendOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await sendOtp(email);
      setStep('otp');
      setMessage('OTP sent to your email.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await verifyOtp(email, otp);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setError('');
    setMessage('');
  };

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-100">Login</h1>
        <p className="text-sm text-slate-400">Sign in using your email and a one-time password.</p>
      </div>

      {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{error}</p> : null}
      {message ? (
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{message}</p>
      ) : null}

      {step === 'email' ? (
        <form className="space-y-4" onSubmit={handleSendOtp}>
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
          <button type="submit" className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Send OTP
          </button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleVerifyOtp}>
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
          <button type="submit" className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Verify OTP
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Back
          </button>
        </form>
      )}
    </section>
  );
}
