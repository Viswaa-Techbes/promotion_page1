"use client";

import { useState } from "react";
import Image from "next/image";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";

export default function LoginModal({ open, onClose }) {
  const [forgotOpen, setForgotOpen] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

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
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

        {/* Modal Box */}
        <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl p-8 relative text-white">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="text-center mb-6">
            <Image
              src="/logo.png"
              alt="TechBes Logo"
              width={160}
              height={60}
              className="mx-auto"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Mobile"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-blue-500 outline-none"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-orange-500 outline-none"
            />

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-orange-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Modal */}
      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
}