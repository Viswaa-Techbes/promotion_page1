"use client";

import { useState } from "react";
import Image from "next/image";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";

export default function LoginPage() {
  const [forgotOpen, setForgotOpen] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ROLE BASED REDIRECT
      if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/coming-soon";
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1220] via-[#111827] to-[#0b1220] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex relative bg-linear-to-br from-blue-600 via-indigo-600 to-orange-500 items-center justify-center p-10">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white">
            <Image
              src="/logo.png"
              alt="TechBes Logo"
              width={220}
              height={80}
              className="mx-auto mb-6"
              priority
            />
            <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
            <p className="text-white/80 text-sm">
              Secure access to your TechBes dashboard
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 text-white flex flex-col justify-center">

          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <Image
              src="/logo.png"
              alt="TechBes Logo"
              width={180}
              height={60}
              className="mx-auto"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Login to your account
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Use email or mobile number
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email / Phone */}
            <div>
              <label className="text-sm text-gray-400">
                Email or Mobile Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or phone"
                required
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/30 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-orange-500 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL — OUTSIDE FORM */}
      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
}