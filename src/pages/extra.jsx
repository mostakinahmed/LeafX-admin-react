

import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiBarChart2 } from "react-icons/fi";

export default function ToolsPage() {
  const tools = [
    {
      name: "Invoice Generator",
      description: "Create professional invoices for your customers quickly and efficiently.",
      icon: <FiFileText />,
      path: "/tools/invoice",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Sales Report Generator",
      description: "Generate detailed daily, weekly, and monthly sales reports with charts.",
      icon: <FiBarChart2 />,
      path: "/tools/sales-report",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tools</h1>
        <p className="text-gray-600 mt-2">
          Access your essential business tools below.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex flex-col justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            {/* Icon with background */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${tool.color}`}>
              {React.cloneElement(tool.icon, { className: "text-3xl" })}
            </div>

            {/* Tool Name & Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{tool.name}</h2>
              <p className="text-gray-600 mt-2">{tool.description}</p>
            </div>

            {/* Action Button */}
            <Link
              to={tool.path}
              className="mt-auto inline-block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition"
            >
              Open Tool
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
