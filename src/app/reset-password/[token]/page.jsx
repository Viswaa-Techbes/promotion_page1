"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMsg(data.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1220] via-[#111827] to-[#0b1220] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-2xl shadow-2xl p-8 text-white">

        {/* Logo */}
        <div className="text-center mb-6">
          <Image
            src="/logo.png"
            alt="TechBes"
            width={160}
            height={60}
            className="mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold">
            Reset Password
          </h2>
          <p className="text-gray-400 text-sm">
            Enter your new secure password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-400">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/30 outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
            />
          </div>

          {/* Message */}
          {msg && (
            <div className="text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-center">
              {msg}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-orange-500 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}