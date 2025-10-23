import React, { useState } from "react";
import { PiUserRectangleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import BackButton from "../BackButton";

const allSales = [
  {
    id: "#1001",
    pid: "P-001",
    name: "Rafi Ahmed",
    amount: 1200,
    date: "2025-10-15",
    status: "Paid",
  },
  {
    id: "#1002",
    pid: "P-002",
    name: "Sara Rahman",
    amount: 900,
    date: "2025-10-15",
    status: "Pending",
  },
  {
    id: "#1003",
    pid: "P-003",
    name: "Tanvir Hasan",
    amount: 1800,
    date: "2025-10-14",
    status: "Paid",
  },
  {
    id: "#1004",
    pid: "P-004",
    name: "Alif Hossain",
    amount: 500,
    date: "2025-10-13",
    status: "Paid",
  },
];

export default function Sales() {
  const Navigate = useNavigate();
  const [filter, setFilter] = useState({ orderId: "", pid: "", date: "" });
  const [sales, setSales] = useState(allSales);

  const handleFilter = () => {
    const filtered = allSales.filter((s) => {
      return (
        (filter.orderId === "" ||
          s.id.toLowerCase().includes(filter.orderId.toLowerCase())) &&
        (filter.pid === "" ||
          s.pid.toLowerCase().includes(filter.pid.toLowerCase())) &&
        (filter.date === "" || s.date === filter.date)
      );
    });
    setSales(filtered);
  };

  const handleReset = () => {
    setFilter({ orderId: "", pid: "", date: "" });
    setSales(allSales);
  };

  return (
    <div className=" ">
      {/* Header */}
      <Navbar pageTitle="All Sales List" />

      <div className="flex gap-3">
        <BackButton />
        <button
          className="bg-blue-600 text-white px-4 py-2 mb-2 rounded hover:bg-blue-700 transition sm:mt-0"
          onClick={() => Navigate(`/sales/new`)}
        >
          + Create New Sale
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white px-2 pt-2  ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <input
            type="text"
            placeholder="Order ID"
            value={filter.orderId}
            onChange={(e) => setFilter({ ...filter, orderId: e.target.value })}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-blue-500"
          />
          <input
            type="text"
            placeholder="Product ID"
            value={filter.pid}
            onChange={(e) => setFilter({ ...filter, pid: e.target.value })}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-blue-500"
          />
          <input
            type="date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-blue-500"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleFilter}
              className="bg-blue-600 text-white px-8 py-1 rounded hover:bg-blue-700"
            >
              Filter
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-8 py-1 ml-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Sales Table dsa */}
      <div className="bg-white shadow rounded p-2 overflow-x-auto min-h-screen">
        {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">All Sales</h2> */}
        <table className="min-w-full  text-sm text-left border border-gray-200 whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">Product ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-100">
                <td className="p-2 font-medium">{sale.id}</td>
                <td className="p-2">{sale.pid}</td>
                <td className="p-2">{sale.name}</td>
                <td className="p-2 text-blue-600">৳ {sale.amount}</td>
                <td className="p-2">{sale.date}</td>
                <td
                  className={`p-2 font-semibold ${
                    sale.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {sale.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
