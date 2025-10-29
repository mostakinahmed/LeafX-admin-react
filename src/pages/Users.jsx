import { useState } from "react";
import Navbar from "../components/Navbar";
import { div } from "framer-motion/client";
import AdminRegistration from "../components/Users/AdminRegistration";
import AdminList from "../components/Users/AdminList";
import CustomerList from "../components/Users/CustomerList";

export default function Users() {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div>
      <Navbar pageTitle="User Management" />
      <div className="bg-white shadow-lg  p-3 w-full mx-auto">
        {/* Buttons */}
        <div className="flex justify-center  lg:mb-0 mb-2">
          <button
            onClick={() => setActiveTab("customer")}
            className={`lg:px-15 px-2  lg:py-2 py-1  font-medium ${
              activeTab === "customer"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Customer
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`lg:px-19 px-4  text-md ${
              activeTab === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setActiveTab("addAdmin")}
            className={` lg:px-9 px-1   font-medium line-clamp-1 ${
              activeTab === "addAdmin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Add New Admin
          </button>
        </div>

        {/* Conditional Content */}
        <div className=" min-h-screen">
          {activeTab === "admin" && <AdminList />}

          {activeTab === "customer" && <CustomerList />}

          {activeTab === "addAdmin" && <AdminRegistration />}
        </div>
      </div>
    </div>
  );
}
