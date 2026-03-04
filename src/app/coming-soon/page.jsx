"use client";
import { useState } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1220] via-[#111827] to-[#0b1220] text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-20 text-center">

        {/* Glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="TechBes"
            width={200}
            height={80}
            className="mx-auto mb-8"
            priority
          />

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Something Big is Coming 🚀
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            We’re building a smarter, faster service platform with
            real-time tracking, priority support, and seamless booking.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-orange-500 hover:opacity-90 transition">
              Get Early Access
            </button>

            <button className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Services You’ll Get Access To
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {[
              { title: "CCTV Installation", icon: "📹" },
              { title: "Laptop Repair", icon: "💻" },
              { title: "Desktop Repair", icon: "🖥️" },
              { title: "Electrical Services", icon: "⚡" },
              { title: "AMC Contracts", icon: "🛠️" },
              { title: "Networking Solutions", icon: "🌐" },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group"
              >
                <div className="text-3xl mb-4">
                  {service.icon}
                </div>

                <h3 className="font-semibold text-lg group-hover:text-blue-400 transition">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What’s Launching Soon
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Real-time service tracking, faster booking workflows,
            live technician chat, membership dashboards,
            and priority engineer dispatch — all in one platform.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            {[
              {
                q: "When will the platform launch?",
                a: "We’re in final testing phase. Launch announcement coming soon.",
              },
              {
                q: "Will membership pricing change?",
                a: "No. Early members retain lifetime pricing benefits.",
              },
              {
                q: "Will support be available 24/7?",
                a: "Priority members get extended support availability.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <p className="font-semibold">{faq.q}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING CHAT BUTTON */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-blue-600 to-orange-500 px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition"
      >
        Live Chat
      </button>

      {/* CHAT BOX */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-[#0f172a] border border-white/10 text-white rounded-2xl shadow-2xl p-5">

          <h3 className="font-bold mb-2">
            Support Chat
          </h3>

          <p className="text-sm text-gray-400">
            Chat system launching soon.
            Meanwhile contact us:
          </p>

          <p className="text-sm font-semibold mt-3 text-blue-400">
            support@techbes.com
          </p>
        </div>
      )}
    </div>
  );
}