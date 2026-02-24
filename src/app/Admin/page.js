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

  // SAFE FILTER
  const filteredLeads = leads.filter((lead) =>
    (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.phone || "").includes(searchTerm) ||
    (lead.pincode || "").includes(searchTerm)
  );

  // STATUS UPDATE
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

  // DELETE LEAD
  const deleteLead = async (id) => {
    await fetch(`/api/leads?id=${id}`, {
      method: "DELETE",
    });

    setLeads((prev) =>
      prev.filter((lead) => lead._id !== id)
    );
  };

  // EXPORT CSV
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

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage subscription leads
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm border">
            <span className="text-xs text-gray-500 uppercase">
              Total Leads
            </span>
            <div className="text-2xl font-bold text-blue-600">
              {leads.length}
            </div>
          </div>
        </div>

        {/* Search + Export */}
        <div className="bg-white p-4 rounded-t-2xl border border-b-0 flex justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name, phone, pincode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 px-4 py-2 border rounded-lg text-sm"
          />

          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-b-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Pincode</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
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

                      <td className="px-6 py-4 text-sm">
                        {lead.pincode}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead._id, e.target.value)
                          }
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
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