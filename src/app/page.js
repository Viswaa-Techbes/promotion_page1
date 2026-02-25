"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const PromoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password,
      service: formData.get("service"),
      pincode: formData.get("pincode"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccessMsg("Subscribed successfully ✅");

        e.target.reset();

        // Optional — auto close modal after 2 sec
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg("");
        }, 2000);

      } else {
        setSuccessMsg("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      setSuccessMsg("Server error ❌");
    }
  };


  // For repeat Password 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //for success screen 
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <>
      {/* Added py-12 for mobile vertical spacing and bg-gray-900 as fallback */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-start pt-10 sm:pt-14 lg:pt-16">

        {/* HTML5 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 animate-videoFade"
        >
          {/* Replace with your actual video path in the Next.js public folder */}
          <source src="/techbes_bg_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        {/* Added px-4 sm:px-6 for horizontal breathing room on mobile */}
        <div className="w-full max-w-7xl mx-auto relative z-20 px-4 sm:px-6 lg:px-8">

          {/* Company Logo & Name Header */}
          <div className="flex justify-center items-center mb-8 lg:mb-12">
            {/* Adjusted height for responsiveness: h-16 on mobile, h-24 on desktop */}
            <div className="relative bottom-5 lg:bottom-10 h-16 sm:h-20 lg:h-24 w-auto">
              <Image
                src="/logo.png"
                alt="Logo"
                width={400}
                height={160}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Content Area */}
            <div className="lg:col-span-7 relative bottom-6 lg:bottom-10 flex flex-col justify-center text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs sm:text-sm font-bold uppercase tracking-wide mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  Only for Limited Members
                </div>
              </div>

              {/* Responsive text sizes: text-3xl mobile -> text-5xl desktop */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-50 tracking-tight leading-tight">
                Lifetime Service <span className="text-blue-600">Membership</span>
              </h2>

              <p className="mt-4 text-lg sm:text-xl text-amber-300 font-medium px-2 lg:px-0">
                One Time Subscription for All Your Technical Service Needs
              </p>

              <div className="mt-6 py-3 border-y border-gray-100/20 lg:border-gray-100">
                <p className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wider flex flex-wrap justify-center lg:justify-start gap-y-2">
                  <span>CCTV</span> <span className="text-red-500 mx-2 hidden sm:inline">•</span>
                  <span>LAPTOP</span> <span className="text-red-500 mx-2 hidden sm:inline">•</span>
                  <span>DESKTOP</span> <span className="text-red-500 mx-2 hidden sm:inline">•</span>
                  <span>ELECTRICAL</span> <span className="text-red-500 mx-2 hidden sm:inline">•</span>
                  <span>NETWORKING</span>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  "Priority Service Support",
                  "Same Day Visit",
                  "Expert Engineers & Professionals",
                  "Lifetime Membership Access",
                  "Two Free Visits",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 group justify-center sm:justify-start">
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-blue-100 font-semibold group-hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pricing Card Area */}
            <div className="lg:col-span-5 relative bottom-14 lg:bottom-6 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="h-2 w-full bg-linear-to-r from-blue-600 to-blue-400"></div>

                <div className="p-6 sm:p-8">
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-400 uppercase">
                      One Time Subscription
                    </span>
                  </div>
                  <div className="text-center mb-2">
                    <span className="text-xs text-red-400">
                      * For First 300 Subscribers Only
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl sm:text-2xl text-gray-400 line-through font-semibold">₹4,999</span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] sm:text-xs font-extrabold rounded-md uppercase">Save 60%</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">₹</span>
                      <span className="text-5xl sm:text-6xl font-extrabold text-blue-600 tracking-tighter">1999</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-8 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Subscribe Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Secure, encrypted payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Footer */}
        <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-full text-center px-4">
          <div className="px-3 py-1.5 rounded">
            <p className="text-[10px] text-white/90">
              * Terms & Conditions apply. Membership benefits are subject to service availability & location coverage.
            </p>
          </div>
        </div>

      </section>


      {/* Modal Overlay & Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          {/* Added max-h-[90vh] and overflow-y-auto to allow scrolling on small landscape screens */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">

            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Complete Subscription</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Form - Added overflow-y-auto to form area */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full text-black px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full text-black px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-medium sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    className="flex-1 text-black min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full text-black px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 characters.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Repeat Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full text-black px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service Needed <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  name="service"
                  defaultValue=""
                  className="w-full text-black px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                >
                  <option value="" disabled>
                    Select your required service
                  </option>
                  <option value="CCTV">CCTV Solutions</option>
                  <option value="Laptop Repair">Laptop Repair</option>
                  <option value="Desktop Repair">Desktop Repair</option>
                  <option value="Electrical Work">Electrical Work</option>
                  <option value="Annual Maintenance Contracts(AMC)">Annual Maintenance Contracts(AMC)</option>
                  <option value="Network Infrastructure Solutions">Network Infrastructure Solutions</option>
                </select>

                <p className="mt-1 text-xs text-gray-500">
                  Service currently limited to specific zones.
                </p>
              </div> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service Pincode <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    required
                    name="pincode"
                    defaultValue=""
                    className="
        w-full
        appearance-none
        bg-white
        text-black
        px-4
        py-2.5
        pr-10
        rounded-lg
        border border-gray-200
        focus:border-blue-600
        focus:ring-2 focus:ring-blue-600/20
        outline-none
        transition-all
      "
                  >
                    <option value="" disabled>
                      Select your pincode
                    </option>

                    {/* VALUE = Full Data | TEXT = Clean UI */}

                    <option value="560010 - Rajaji Nagar">560010</option>
                    <option value="560018 - Mysore Road">560018</option>
                    <option value="560021 - Rajaji Nagar">560021</option>
                    <option value="560022 - Yeshwanthpur">560022</option>
                    <option value="560023 - Rajaji Nagar">560023</option>
                    <option value="560026 - Mysore Road">560026</option>
                    <option value="560046 - Vijay Nagar">560046</option>
                    <option value="560054 - Yeshwanthpur">560054</option>
                    <option value="560056 - Nagarbhavi">560056</option>
                    <option value="560058 - Peenya">560058</option>
                    <option value="560060 - Kengeri">560060</option>
                    <option value="560072 - Nagarbhavi">560072</option>
                    <option value="560073 - Peenya">560073</option>
                    <option value="560074 - Kengeri">560074</option>
                    <option value="560079 - Vijay Nagar">560079</option>
                    <option value="560091 - Peenya">560091</option>

                  </select>

                  {/* Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Service currently limited to specific zones.
                </p>
              </div>
              {successMsg && (
                <div className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-lg">
                  {successMsg}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default PromoSection;