import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { div } from "framer-motion/client";
import AdminRegistration from "../components/Users/AdminRegistration";
import AdminList from "../components/Users/AdminList";
import CustomerList from "../components/Users/CustomerList";
import { DataContext } from "@/Context Api/ApiContext";
import CheckAndUpdateStock from "@/components/Stock/CheckAndUpdateStock";

export default function Users() {
  const { updateApi } = useContext(DataContext);
  updateApi();
  const [activeTab, setActiveTab] = useState("checkStock");

  return (
    <div>
      <Navbar pageTitle="Stock Management" />
      <div className="bg-white shadow p-2 md:p-3 w-full mx-auto">
        {/* Buttons */}
        <div className="flex justify-center  lg:mb-0 mb-2">
          <button
            onClick={() => setActiveTab("checkStock")}
            className={`lg:px-15 px-2  lg:py-2 py-1  font-medium ${
              activeTab === "checkStock"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Check & Update
          </button>

            <button
            onClick={() => setActiveTab("customer")}
            className={`lg:px-19 px-4  text-md ${
              activeTab === "customer"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Out Of Stock & Alert
          </button>
        
        </div>

        {/* Conditional Content */}
        <div className=" min-h-screen">
          {activeTab === "checkStock" && <CheckAndUpdateStock />}

          {activeTab === "customer" && <CustomerList />}

        
        </div>
      </div>
    </div>
  );
}
