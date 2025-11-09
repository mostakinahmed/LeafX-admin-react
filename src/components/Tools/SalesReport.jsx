import React, { useState } from "react";
import {
  FiCalendar,
  FiDownload,
  FiBarChart2,
  FiFileText,
} from "react-icons/fi";

export default function SalesReportGenerator() {
  const [dateRange, setDateRange] = useState("Last 7 Days");

  const ranges = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Custom Range",
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Sales Report Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Generate insightful reports to analyze sales performance.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          <FiDownload className="text-lg" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded shadow-sm p-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3">
          <FiCalendar className="text-blue-600 text-xl" />
          <label className="text-gray-700 font-medium">Date Range:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {ranges.map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </div>

        <button className="ml-auto bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Generate
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Sales",
            value: "$12,450",
            icon: <FiBarChart2 className="text-blue-600 text-3xl" />,
          },
          {
            title: "Orders",
            value: "342",
            icon: <FiFileText className="text-green-600 text-3xl" />,
          },
          {
            title: "Average Order",
            value: "$36.40",
            icon: <FiBarChart2 className="text-orange-500 text-3xl" />,
          },
          {
            title: "New Customers",
            value: "45",
            icon: <FiFileText className="text-purple-600 text-3xl" />,
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-600 text-sm font-medium">
                {card.title}
              </h2>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Sales Overview
        </h2>
        <div className="h-72 flex items-center justify-center border border-dashed border-gray-300 rounded text-gray-400">
          📊 Chart will appear here
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Detailed Report
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2025-11-01",
                  id: "ORD-001",
                  customer: "Rahim Uddin",
                  total: "$120",
                  status: "Completed",
                },
                {
                  date: "2025-11-02",
                  id: "ORD-002",
                  customer: "Karim Ali",
                  total: "$90",
                  status: "Pending",
                },
                {
                  date: "2025-11-03",
                  id: "ORD-003",
                  customer: "Mostakin",
                  total: "$140",
                  status: "Completed",
                },
                {
                  date: "2025-11-04",
                  id: "ORD-004",
                  customer: "Sabbir Hasan",
                  total: "$85",
                  status: "Cancelled",
                },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b">{row.date}</td>
                  <td className="px-4 py-2 border-b">{row.id}</td>
                  <td className="px-4 py-2 border-b">{row.customer}</td>
                  <td className="px-4 py-2 border-b">{row.total}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
