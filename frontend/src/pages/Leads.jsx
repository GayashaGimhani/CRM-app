import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  const [status, setStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [assignedSalesperson, setAssignedSalesperson] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, [status, leadSource, assignedSalesperson, search]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads", {
        params: {
          status,
          leadSource,
          assignedSalesperson,
          search,
        },
      });

      setLeads(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch leads");
    }
  };

  const deleteLead = async (id) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/leads/${id}/status`, {
        status: newStatus,
      });

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Leads</h1>

        <Link
          to="/leads/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Lead
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">

        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          className="border p-2"
          placeholder="Lead Source"
          value={leadSource}
          onChange={(e) => setLeadSource(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Assigned Salesperson"
          value={assignedSalesperson}
          onChange={(e) => setAssignedSalesperson(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Search name, email, company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3">Source</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Value</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-medium">{lead.leadName}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.companyName}</td>

                {/* STATUS DROPDOWN */}
                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3">{lead.leadSource}</td>
                <td className="p-3">{lead.assignedSalesperson}</td>
                <td className="p-3">LKR {lead.dealValue}</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 flex gap-2">

                  <Link
                    to={`/leads/${lead._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>

                  <Link
                    to={`/leads/edit/${lead._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}