import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";

const OrderFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Orders");
  const [statusOpen, setStatusOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const statuses = [
    "Pending Orders",
    "Confirmed Orders",
    "Shipped Orders",
    "Delivered Orders",
    "Today’s Orders",
    "Cancelled Orders",
    "All Orders",
  ];

  return (
    <div className="w-full flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Status Dropdown */}
      <div className="relative w-full lg:w-55">
        <button
          onClick={() => setStatusOpen(!statusOpen)}
          className="w-full flex justify-between items-center bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium hover:shadow-md transition-all"
        >
          {selectedStatus}
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              statusOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {statusOpen && (
          <div className="absolute w-full lg:w-55 mt-2 bg-white border border-gray-200 rounded shadow overflow-hidden z-10">
            {statuses.map((status) => (
              <div
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  setStatusOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                  selectedStatus === status
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="w-full lg:w-55">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Select Date"
          className="w-full px-4 py-2 border border-gray-300 bg-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Reset Button */}
      <div className="w-full lg:w-auto">
        <button
          onClick={() => setStartDate(null)}
          className="w-full lg:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
