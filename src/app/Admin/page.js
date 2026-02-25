"use client";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {

  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // FETCH LEADS
  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLeads(data.data);
        }
      });
  }, []);

  // ===============================
  // ✅ STATS CALCULATION
  // ===============================

  const normalizeStatus = (status) =>
    status?.toLowerCase().trim();

  const activeCount = leads.filter((lead) =>
    ["active", "contacted", "converted"].includes(
      normalizeStatus(lead.status)
    )
  ).length;

  const notActiveCount = leads.filter((lead) =>
    ["not active", "pending"].includes(
      normalizeStatus(lead.status)
    )
  ).length;

  // ===============================
  // SAFE FILTER
  // ===============================

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase().trim();

    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.toString().toLowerCase().includes(term) ||
      lead.pincode?.toString().toLowerCase().includes(term) ||
      lead.service?.toLowerCase().includes(term) ||
      lead.status?.toLowerCase().includes(term)
    );
  });

  // ===============================
  // STATUS UPDATE
  // ===============================

  const updateStatus = async (id, status) => {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, status } : lead
      )
    );
  };

  // ===============================
  // EXPORT CSV
  // ===============================

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Service",
      "Pincode",
      "Status",
      "Date",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.service,
      lead.pincode,
      lead.status,
      lead.createdAt
        ? new Date(lead.createdAt).toLocaleDateString()
        : "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">

        {/* ===============================
            HEADER + STATS
        =============================== */}

        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage subscription leads
            </p>
          </div>

          {/* Stats Boxes */}
          <div className="flex gap-4">

            {/* Total */}
            <div className="bg-white p-3 rounded-xl shadow-sm border text-center min-w-24">
              <span className="text-xs text-gray-500 uppercase">
                Total
              </span>
              <div className="text-2xl font-bold text-blue-600">
                {leads.length}
              </div>
            </div>

            {/* Active */}
            <div className="bg-white p-3 rounded-xl shadow-sm border text-center min-w-24">
              <span className="text-xs text-gray-500 uppercase">
                Active
              </span>
              <div className="text-2xl font-bold text-green-600">
                {activeCount}
              </div>
            </div>

            {/* Not Active */}
            <div className="bg-white p-3 rounded-xl shadow-sm border text-center min-w-24">
              <span className="text-xs text-gray-500 uppercase">
                Not Active
              </span>
              <div className="text-2xl font-bold text-red-600">
                {notActiveCount}
              </div>
            </div>

          </div>
        </div>

        {/* ===============================
            SEARCH + EXPORT
        =============================== */}

        <div className="bg-white p-4 rounded-t-2xl border border-b-0 flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name, phone, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg text-sm"
          />

          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* ===============================
            TABLE
        =============================== */}

        <div className="bg-white border rounded-b-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Pincode</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b hover:bg-gray-50">

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold">
                        {lead.name}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div>+91 {lead.phone}</div>
                        <div className="text-xs text-gray-500">
                          {lead.email || "No email"}
                        </div>
                      </td>

                      {/* ✅ Service */}
                      <td className="px-6 py-4 text-sm">
                        {lead.service || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {lead.pincode}
                      </td>

                      {/* ✅ Password Mask */}
                      <td className="px-6 py-4 text-sm">
                        {lead.password ? "••••••••" : "Not Set"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead._id, e.target.value)
                          }
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="Active">Active</option>
                          <option value="Not Active">Not Active</option>
                        </select>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500 text-sm"
                    >
                      No leads found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;