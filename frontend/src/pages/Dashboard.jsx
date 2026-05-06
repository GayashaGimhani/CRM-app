import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/leads/dashboard");
    setData(res.data);
  };

  const cards = [
    { label: "Total Leads", key: "total", color: "bg-blue-500" },
    { label: "New Leads", key: "newLeads", color: "bg-yellow-500" },
    { label: "Qualified Leads", key: "qualified", color: "bg-purple-500" },
    { label: "Won Leads", key: "won", color: "bg-green-500" },
    { label: "Lost Leads", key: "lost", color: "bg-red-500" },
    { label: "Total Deal Value", key: "totalDealValue", color: "bg-indigo-500" },
    { label: "Won Deal Value", key: "wonDealValue", color: "bg-emerald-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-6">CRM</h2>

        <nav className="flex flex-col gap-3">

          <Link
            to="/dashboard"
            className={`p-2 rounded ${
              location.pathname === "/dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/leads"
            className={`p-2 rounded ${
              location.pathname === "/leads"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            📋 Manage Leads
          </Link>

        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">CRM Dashboard</h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`${card.color} text-white p-5 rounded shadow`}
            >
              <h3 className="text-sm opacity-80">{card.label}</h3>
              <p className="text-2xl font-bold mt-2">
                {data[card.key] ?? 0}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}