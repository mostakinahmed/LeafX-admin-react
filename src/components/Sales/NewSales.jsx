import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import BackButton from "../BackButton";

export default function NewSale() {
  
  const [saleData, setSaleData] = useState({
    customerName: "",
    productId: "",
    productName: "",
    amount: "",
    paymentStatus: "Paid",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !saleData.customerName ||
      !saleData.productId ||
      !saleData.productName ||
      !saleData.amount
    ) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    console.log("New Sale Data:", saleData);
    alert("✅ Sale created successfully!");
    // Here you can send `saleData` to backend using axios or fetch
    setSaleData({
      customerName: "",
      productId: "",
      productName: "",
      amount: "",
      paymentStatus: "Paid",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className=" space-y-6">
      <Navbar pageTitle="Create New Sales" />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-100 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={saleData.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <input
              type="text"
              name="productId"
              value={saleData.productId}
              onChange={handleChange}
              placeholder="Enter product ID"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={saleData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (৳)
            </label>
            <input
              type="number"
              name="amount"
              value={saleData.amount}
              onChange={handleChange}
              placeholder="Enter sale amount"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={saleData.paymentStatus}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={saleData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
         <BackButton/>
          <button
            type="reset"
            onClick={() =>
              setSaleData({
                customerName: "",
                productId: "",
                productName: "",
                amount: "",
                paymentStatus: "Paid",
                date: new Date().toISOString().split("T")[0],
              })
            }
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Sale
          </button>
        </div>
      </form>
    </div>
  );
}
