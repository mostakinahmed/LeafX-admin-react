import Navbar from "@/components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiLogOut, FiDollarSign, FiShoppingCart, FiClock, FiUsers } from "react-icons/fi";

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar pageTitle="Accounts Section" />

 

      {/* ====== Account Summary Section ====== */}
      <div className=" py-2">
        

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Today’s Income */}
          <div className="bg-white shadow-sm border border-gray-100 rounded p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-green-100 rounded-full">
              <FiDollarSign className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today’s Income</p>
              <h3 className="text-xl font-bold text-gray-800">$1,240</h3>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white shadow-sm border border-gray-100 rounded p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiShoppingCart className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-xl font-bold text-gray-800">320</h3>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white shadow-sm border border-gray-100 rounded p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClock className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <h3 className="text-xl font-bold text-gray-800">28</h3>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white shadow-sm border border-gray-100 rounded p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiUsers className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h3 className="text-xl font-bold text-gray-800">1,045</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
