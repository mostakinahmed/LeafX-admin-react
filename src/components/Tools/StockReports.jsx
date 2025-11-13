import { DataContext } from "@/Context Api/ApiContext";
import React, { useContext, useEffect, useState } from "react";
import { FiCalendar, FiBox, FiActivity, FiCreditCard } from "react-icons/fi";

export const StockReports = () => {
  const { productData, categoryData, stockData, updateApi } =
    useContext(DataContext);
  // --- States ---
  const [dateRange, setDateRange] = useState(null);
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [calender, setCalender] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState("Select Category");
  // --- Date ranges list ---
  const ranges = [
    "Today",
    "Last 7 Days",
    "Last 15 Days",
    "Last 30 Days",
    "This Month",
    "This Year",
    "Custom Range",
  ];

  //All filter
  useEffect(() => {
    if (category && category !== "Select Category") {
      let data;
      data = productData
        .filter((product) => product.category === category)
        .map((product) => product.brandName);

      if (category === "All") {
        data = productData.map((product) => product.brandName);
      }

      const uniqueBrands = [...new Set(data)];
      setBrand(uniqueBrands);
    } else {
      setBrand(null);
    }
  }, [category, productData]);

  console.log(brand);

  return (
    <div>
      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded shadow-sm p-6 flex flex-wrap gap-4 items-center">
        <div className="w-full justify-between flex">
          <div className="flex gap-8">
            {/* Date Range */}
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
            {dateRange === "Custom Range" && (
              <>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">From:</label>
                  <input
                    type="date"
                    // value={fromDate}
                    // onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* To Date */}
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">To:</label>
                  <input
                    type="date"
                    // value={toDate}
                    // onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </>
            )}
          </div>

          <div>
            {/* Generate Button */}
            <button className="ml-auto bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              Generate
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row gap-10 border-t ">
          {/* Category Filter */}
          <div className="flex items-center gap-3 mt-5">
            <FiBox className="text-blue-600 text-xl" />
            <label className="text-gray-700 font-medium">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option>Select Category</option>
              <option>All</option>
              {categoryData?.map((cat, idx) => (
                <option key={idx} value={cat.catID}>
                  {cat.catID + " - " + cat.catName}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          {brand && (
            <div className="flex items-center gap-3 mt-5">
              <FiActivity className="text-blue-600 text-xl" />
              <label className="text-gray-700 font-medium">Brand:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option>All</option>
                {brand?.map((b, idx) => (
                  <option key={idx} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Payment Filter */}
          <div className="flex items-center gap-3 mt-5">
            <FiCreditCard className="text-blue-600 text-xl" />
            <label className="text-gray-700 font-medium">Product List:</label>
            <select
              // value={payment}
              // onChange={(e) => setPayment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option>All</option>
              <option>COD</option>
              <option>Card</option>
              <option>bKash</option>
              <option>Nagad</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3 mt-5">
            <FiCreditCard className="text-blue-600 text-xl" />
            <label className="text-gray-700 font-medium">Status:</label>
            <select
              // value={payment}
              // onChange={(e) => setPayment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option>All</option>
              <option>Low Stock</option>
              <option>Out Of Stock </option>
              <option>Available Stock</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
