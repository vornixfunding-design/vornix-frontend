"use client";

import { useState } from "react";
import { apiPost } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      await apiPost("/otp/send", { email });
      setStep("otp");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await apiPost("/otp/verify", { email, otp });

      const res = await apiPost("/auth/register", { email, password });

      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-semibold text-white">Create Account</h1>

      {error && (
        <p className="p-3 rounded bg-red-500/20 text-red-300 text-sm">{error}</p>
      )}

      {step === "email" && (
        <div className="space-y-3">
          <input
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full p-3 rounded bg-cyan-500 text-slate-900 font-semibold"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-3">
          <input
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="w-full p-3 rounded bg-cyan-500 text-slate-900 font-semibold"
            onClick={submitSignup}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Create Account"}
          </button>
        </div>
      )}
    </section>
  );
}
