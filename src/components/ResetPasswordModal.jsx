"use client";

import { useState } from "react";

export default function ResetPasswordModal({ token }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">

      <div className="bg-[#111827] p-8 rounded-3xl w-full max-w-md shadow-2xl text-white">

        <h2 className="text-2xl font-bold mb-6">
          Set New Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="password"
            required
            minLength={6}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-orange-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 font-semibold"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          {msg && (
            <p className="text-center mt-3 text-green-400 text-sm">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}