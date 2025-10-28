import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/Category/CategoryList";
import { DataContext } from "../Context Api/ApiContext";
import AddCategory from "../components/Category/AddCategory";

export default function Category() {
  const { categoryData, productData, loading } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState("catList");
  return (
    <div>
      <Navbar pageTitle="Category Management" />
      <div className="bg-white shadow-lg  p-3 w-full mx-auto">
        {/* Buttons */}
        <div className="flex w-full justify-center  lg:mb-0 mb-2">
          <button
            onClick={() => setActiveTab("catList")}
            className={`lg:px-20 w-1/2 lg:w-auto   text-md ${
              activeTab === "catList"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Category List
          </button>
          <button
            onClick={() => setActiveTab("addCat")}
            className={`lg:px-20 w-1/2 lg:w-auto  lg:py-2 py-1  font-medium ${
              activeTab === "addCat"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Add Category
          </button>
        </div>

        {/* Conditional Content */}
        <div className=" min-h-screen">
          {activeTab === "catList" && <CategoryList data={categoryData} />}
          {activeTab === "addCat" && <AddCategory />}
        </div>
      </div>
    </div>
  );
}
