import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Invoice from "../components/Tools/Invoice";
import SalesReport from "../components/Tools/SalesReport";

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
            className={`lg:px-25 px-9  lg:py-2 py-1  font-medium ${
              activeTab === "customer"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Invoice
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`lg:px-19 px-4  text-md ${
              activeTab === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sales Report
          </button>
        </div>

        {/* Conditional Content */}
        <div className=" min-h-screen">
          {activeTab === "customer" && <Invoice />}
          {activeTab === "admin" && <SalesReport />}
        </div>
      </div>
    </div>
  );
}
