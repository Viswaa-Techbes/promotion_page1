"use client";

import { useState } from "react";

export default function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f172a] w-full max-w-md p-6 rounded-2xl shadow-2xl text-white relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">
          Reset Your Password
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Enter your registered email to receive reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-orange-500 font-semibold hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {msg && (
            <p className="text-sm text-center mt-3 text-green-400">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}