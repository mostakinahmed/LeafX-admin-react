import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import { dummyOrders } from "./DummyOrder"; // your dummy data
import { Calendar } from "lucide-react";

const OrderList = () => {
  const [filter, setFilter] = useState({ orderId: "", pid: "" });
  const [selectedStatus, setSelectedStatus] = useState("All Orders");
  const [statusOpen, setStatusOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const statuses = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "All Orders",
  ];

  // Filter orders based on status, date, and search
  const filteredOrders = dummyOrders.filter((order) => {
    const statusMatch =
      selectedStatus === "All Orders" || order.status === selectedStatus;

    const dateMatch = startDate
      ? new Date(order.order_date).toDateString() === startDate.toDateString()
      : true;

    const orderIdMatch = filter.orderId
      ? order.order_id.toLowerCase().includes(filter.orderId.toLowerCase())
      : true;

    return statusMatch && dateMatch && orderIdMatch;
  });

  // Reset all filters
  const handleReset = () => {
    setSelectedStatus("All Orders");
    setStartDate(null);
    setFilter({ orderId: "", pid: "" });
  };

  return (
    <div className="bg-white min-h-screen p-3">
      {/* Filters */}
      <div className="w-full flex flex-col gap-3 lg:flex-row lg:items-center mb-3">
        {/* Status Dropdown */}
        <div className="relative w-full lg:w-52">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="w-full flex justify-between items-center bg-white border border-gray-300 rounded px-4 py-1 text-gray-700 font-medium hover:shadow-md transition-all"
          >
            {selectedStatus}
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                statusOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {statusOpen && (
            <div className="absolute w-full lg:w-52 mt-2 bg-white border border-gray-200 rounded shadow overflow-hidden z-10">
              {statuses.map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setStatusOpen(false);
                  }}
                  className={`px-4 py-1 cursor-pointer hover:bg-gray-200 transition ${
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

        <div className="w-full lg:w-55 relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Date"
            className="w-full px-4 py-1 border border-gray-300 bg-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            dateFormat="dd/MM/yyyy"
          />
          <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Order ID Search */}
        <div className="w-full lg:w-55">
          <input
            type="text"
            placeholder="Order ID"
            value={filter.orderId}
            onChange={(e) => setFilter({ ...filter, orderId: e.target.value })}
            className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Reset Button */}
        <div className="w-full ml-1 lg:w-auto">
          <button
            onClick={handleReset}
            className="w-full lg:w-auto px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-t">
        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">Customer</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Mode</th>
              <th className="px-4 py-2 border-b">Total Amount</th>
              <th className="px-4 py-2 border-b">Payment</th>
              <th className="px-4 py-2 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{order.order_id}</td>
                  <td className="px-4 py-2 border-b">
                    {order.shipping_address.recipient_name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(order.order_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">{order.status}</td>
                  <td className="px-4 py-2 border-b">{order.Mode}</td>
                  <td className="px-4 py-2 border-b">
                    ${order.total_amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {order.payment.method} ({order.payment.status})
                  </td>
                  <td className="px-4 py-2 border-b">
                    {order.items.map((item) => (
                      <div key={item.product_id}>
                        {item.product_name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
