"use client";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {

  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // ===============================
  // FETCH LEADS
  // ===============================

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLeads(data.data);
      });
  }, []);

  // ===============================
  // STATUS COUNTS
  // ===============================

  const normalize = (status) =>
    status?.toLowerCase().trim();

  const totalCount = leads.length;

  const activeCount = leads.filter((lead) =>
    ["active", "contacted", "converted"].includes(
      normalize(lead.status)
    )
  ).length;

  const notActiveCount = leads.filter((lead) =>
    ["not active", "pending"].includes(
      normalize(lead.status)
    )
  ).length;

  // ===============================
  // FILTER
  // ===============================

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase().trim();

    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.toString().includes(term) ||
      lead.pincode?.toString().includes(term) ||
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
  // PASSWORD RESET
  // ===============================

  const handlePasswordReset = async () => {
    if (!newPassword) return;

    const token = localStorage.getItem("token");

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: selectedUser,
        newPassword,
      }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        setSelectedUser(null);
        setNewPassword("");
        setMessage("");
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* ===============================
            HEADER + STATS
        =============================== */}

        <div className="mb-8 flex flex-col md:flex-row justify-between gap-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage subscription leads
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4">

            <div className="bg-white p-4 rounded-xl shadow border text-center min-w-28">
              <div className="text-xs uppercase text-gray-500">
                Total
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {totalCount}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border text-center min-w-28">
              <div className="text-xs uppercase text-gray-500">
                Active
              </div>
              <div className="text-2xl font-bold text-green-600">
                {activeCount}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border text-center min-w-28">
              <div className="text-xs uppercase text-gray-500">
                Not Active
              </div>
              <div className="text-2xl font-bold text-red-600">
                {notActiveCount}
              </div>
            </div>

          </div>
        </div>

        {/* ===============================
            SEARCH
        =============================== */}

        <div className="bg-white p-4 rounded-t-2xl border border-b-0 flex justify-between">
          <input
            type="text"
            placeholder="Search by name, phone, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* ===============================
            TABLE
        =============================== */}

        <div className="bg-white border rounded-b-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
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

                      <td className="px-6 py-4 font-medium">
                        {lead.name}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div>+91 {lead.phone}</div>
                        <div className="text-xs text-gray-500">
                          {lead.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {lead.service}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {lead.pincode}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedUser(lead._id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Reset Password
                        </button>
                      </td>

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
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No leads found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* ===============================
          PASSWORD RESET MODAL
      =============================== */}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">

            <h2 className="text-lg font-bold mb-4">
              Reset User Password
            </h2>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border rounded-lg mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handlePasswordReset}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                Update
              </button>

              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

            {message && (
              <p className="mt-3 text-sm text-green-600">
                {message}
              </p>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;