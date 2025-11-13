import React, { useState } from "react";
import {
  FiCalendar,
  FiDownload,
  FiBarChart2,
  FiFileText,
} from "react-icons/fi";
import { StockReports } from "./StockReports";
import { ProductReports } from "./ProductReports";
import { SalesReports } from "./SalesReports";
export default function SalesReportGenerator() {
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [activeTab, setActiveTab] = useState("stockTab");
  const ranges = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Custom Range",
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="lg:text-3xl  text-2xl  font-bold text-gray-800">Report Generator</h1>
        </div>
      </div>

      {/* Heading  */}
      <div className=" w-full flex gap-3 text-white bg-gray-200  text-xl h-10">
        <div
          className={` ${
            activeTab === "stockTab"
              ? "bg-blue-600"
              : "bg-green-600 hover:bg-green-700 "
          }  w-32 h-full rounded lg:rounded-none flex items-center justify-center`}
        >
          <button
            className="w-full text-lg h-full"
            onClick={() => {
              setActiveTab("stockTab");
            }}
          >
            Stock
          </button>
        </div>

        <div
          className={` ${
            activeTab === "salesTab"
              ? "bg-blue-600"
              : "bg-green-600 hover:bg-green-700 "
          }  w-32 h-full rounded lg:rounded-none  flex items-center justify-center`}
        >
          <button
            className="w-full text-lg h-full"
            onClick={() => {
              setActiveTab("salesTab");
            }}
          >
            Sales
          </button>
        </div>

        <div
          className={` ${
            activeTab === "productTab"
              ? "bg-blue-600"
              : "bg-green-600 hover:bg-green-700 "
          }  w-32 h-full  rounded lg:rounded-none  flex items-center justify-center`}
        >
          <button
            className="w-full  text-lg h-full"
            onClick={() => {
              setActiveTab("productTab");
            }}
          >
            Product
          </button>
        </div>
      </div>

      {/* //show details */}
      {activeTab === "stockTab" && <StockReports />}
      {activeTab === "salesTab" && <SalesReports />}
      {activeTab === "productTab" && <ProductReports />}
    </div>
  );
}
