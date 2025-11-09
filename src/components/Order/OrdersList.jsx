import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import { dummyOrders } from "./DummyOrder"; // your dummy data
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ orderId: "", pid: "" });
  const [selectedStatus, setSelectedStatus] = useState("All Orders");
  const [statusOpen, setStatusOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const statuses = [
    "All Orders",
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
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
      <div className="md:flex gap-3">
        {/* left side */}
        <div className="lg:w-3/4 overflow-x-auto whitespace-nowrap mb-5 lg:mb-0 ">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-fixed text-sm text-left border border-gray-200">
              <thead className="bg-gray-300">
                <tr className="">
                  <th className="px-4 py-2 border-b border-gray-300 text-gray-800 font-semibold">
                    Order ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-gray-800 font-semibold">
                    Customer
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-gray-800 font-semibold">
                    Total Amount
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-gray-800 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-200">
                      <td className="px-4 py-2 border-b">{order.order_id}</td>
                      <td className="px-4 py-2 border-b">
                        {order.shipping_address.recipient_name}
                      </td>
                      <td className="px-4 py-2 border-b">
                        ${order.total_amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b">{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center px-4 py-6 text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* right side */}
        <div className="bg-red-600 w-full h-50  rounded">
          <h1 className="bg-green-200 p-[5px] text-center text-lg font-bold">
            Order Details
          </h1>
          <div className=" mx-auto ">
            {/* 1. Product Info Section */}
            <div className="bg-white border-l">
              {/* header */}
              <div className="flex border-b justify-between">
                <h3 className="text-xl font-semibold mt-4 mx-4">
                  Product Info
                </h3>
                <h3 className="lg:text-2xl font-bold rounded-xl px-3 my-2 bg-red-500 text-white">
                  Pending
                </h3>
              </div>

              {/* Product 1 */}
              <div className="lg:flex flex-col lg:flex-row p-4 rounded space-x-4 ">
                <img
                  src="https://www.mobiledokan.com/media/tecno-camon-40-pro-emerald-lake-green-official-image.webp"
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-1">
                  <p>
                    <span className="font-medium">Product ID:</span> P00001
                  </p>

                  <p>
                    <span className="font-medium">Name:</span> Mostakin
                  </p>

                  <p>
                    SKU ID:{" "}
                    <span className="font-bold bg-green-300 px-2 rounded-3xl">
                      SKU-17278595001
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Quantity:</span> 1
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> $120
                  </p>
                </div>
                {/* <div>
                  <label className="font-medium block mb-1">Status</label>
                  <select className="border rounded px-2 py-1">
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Delivered</option>
                  </select>
                </div> */}
              </div>
            </div>

            {/* 2. Customer Info Section */}
            <div className="bg-white w-full p-4 mr-1 space-y-1 border-l">
              <h3 className="text-xl font-semibold border-b pb-1 mb-2 -mt-4">
                Customer Info
              </h3>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="">
                  <p>
                    <span className="font-medium">Customer ID:</span> CUS-0001
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> Rahim Uddin
                  </p>
                  <p>
                    Phone:
                    <span className="font-medium bg-yellow-300 ml-1 px-2 rounded-xl ">
                      01773820336
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    rahim@example.com
                  </p>
                  <p>
                    <span className="font-medium">Discount:</span> 10%
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Payment & Address Section */}
            <div className="bg-white p-4 border-l -mt-5 space-y-1">
              <h3 className="text-xl font-semibold border-b pb-2 mb-2">
                Payment & Shipping
              </h3>

              <div className="flex  flex-col lg:flex-row justify-between mr-6">
                <div>
                  <p>
                    <span className="font-medium">Shipping Address:</span> House
                    12, Road 5
                  </p>
                  <p>
                    <span className="font-medium">Shipping Cost:</span> $20
                  </p>
                  <p className="font-semibold text-lg mt-2 lg:-mb-3">
                    Total Amount: $300
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Payment Method:</span> COD
                  </p>
                  <p>
                    <span className="font-medium">Payment Status:</span> Pending
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t flex pt-3 pb-3 lg:pb-0 gap-3 justify-end">
              <button className="bg-red-500 text-lg rounded hover:bg-red-700 text-white p-1 px-3">
                cancel
              </button>
              <button className="bg-green-500 text-lg rounded hover:bg-green-700 text-white p-1 px-3">
                confirmed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//order
export default OrderList;
