import React, { useContext, useState } from "react";
import { DataContext } from "@/Context Api/ApiContext";
import { FiCalendar, FiBox, FiActivity, FiCreditCard } from "react-icons/fi";
import Swal from "sweetalert2";
import { generateProductPDF } from "./pdfMake";

export const StockReports = () => {
  const { productData, categoryData } = useContext(DataContext);

  // Track all dropdown values in one object
  const [filterValues, setFilterValues] = useState({
    category: "Select Category",
    brand: "Select Brand",
    product: "Select Product",
    status: "Select Status",
    dateRange: "Today",
    fromDate: "",
    toDate: "",
  });

  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visibleBrand, setVisibleBrand] = useState(false);
  const [visibleProduct, setVisibleProduct] = useState(false);
  const [visibleStatus, setVisibleStatus] = useState(false);

  const ranges = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 15 Days",
    "Last 30 Days",
    "This Month",
    "This Year",
    "Custom Range",
  ];
  // 🔹 Category Change
  const handleCategoryChange = (value) => {
    setFilterValues((prev) => ({ ...prev, category: value }));

    if (value === "Select Category") {
      setVisibleBrand(false);
      setVisibleProduct(false);
      setVisibleStatus(false);
      return;
    }

    let brands = [];
    if (value === "All") {
      // Get all unique brand names
      const uniqueBrandNames = [
        ...new Set(productData.map((p) => p.brandName)),
      ];
      // Convert back to objects if needed
      brands = uniqueBrandNames.map((name) => ({ brandName: name }));
    } else {
      // Filter by category and get unique brand names
      const uniqueBrandNames = [
        ...new Set(
          productData
            .filter((p) => p.category === value)
            .map((p) => p.brandName)
        ),
      ];
      brands = uniqueBrandNames.map((name) => ({ brandName: name }));
    }

    if (brands.length > 0) {
      setBrandList([...brands]);
      setVisibleBrand(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No brand found for this category",
        showConfirmButton: false,
        timer: 1800,
      });
      setVisibleBrand(false);
      setVisibleProduct(false);
      setVisibleStatus(false);
    }
  };

  // 🔹 Brand Change
  const handleBrandChange = (value) => {
    setFilterValues((prev) => ({ ...prev, brand: value }));

    if (value === "Select Brand") {
      setVisibleProduct(false);
      setVisibleStatus(false);
      return;
    }

    let products = [];
    if (value === "All" && filterValues.category === "All") {
      products = productData.filter((p) => p);
    } else if (value === "All" && filterValues.category !== "All") {
      products = productData.filter(
        (p) => p.category === filterValues.category
      );
    } else {
      products = productData
        .filter(
          (p) =>
            p.brandName === value &&
            (filterValues.category === "All" ||
              p.category === filterValues.category)
        )
        .map((p) => p);
    }

    if (products.length > 0) {
      setProductList([...products]);
      setVisibleProduct(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No product found for this brand",
        showConfirmButton: false,
        timer: 1800,
      });
      setVisibleProduct(false);
      setVisibleStatus(false);
    }
  };

  // 🔹 Product Change
  const handleProductChange = (value) => {
    setFilterValues((prev) => ({ ...prev, product: value }));

    if (value && value !== "Select Product") {
      setVisibleStatus(true);
    } else {
      setVisibleStatus(false);
    }
  };

  // 🔹 Status Change
  const handleStatusChange = (value) => {
    setFilterValues((prev) => ({ ...prev, status: value }));
  };

  // 🔹 Date Range Change
  const handleDateRangeChange = (value) => {
    setFilterValues((prev) => ({ ...prev, dateRange: value }));
  };

  // 🔹 Date Inputs
  const handleFromDateChange = (value) => {
    setFilterValues((prev) => ({ ...prev, fromDate: value }));
  };
  const handleToDateChange = (value) => {
    setFilterValues((prev) => ({ ...prev, toDate: value }));
  };

  // 🔹 Generate Button Click
  const handleGenerate = (e) => {
    e.preventDefault();

    if (filterValues.category === "Select Category") {
      Swal.fire({
        icon: "warning",
        title: "Please select a category",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    if (visibleBrand && filterValues.brand === "Select Brand") {
      Swal.fire({
        icon: "warning",
        title: "Please select a brand",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    if (visibleProduct && filterValues.product === "Select Product") {
      Swal.fire({
        icon: "warning",
        title: "Please select a product",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }
    if (visibleProduct && filterValues.status === "Select Status") {
      Swal.fire({
        icon: "warning",
        title: "Please select a status",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    //filter cat data
    let data;
    if (filterValues.category === "All") {
      data = productData.filter((p) => p);
    } else {
      data = productData.filter((p) => p.category === filterValues.category);
    }

    //filter brand
    if (filterValues.brand === "All") {
      data = data.filter((p) => p);
    } else {
      data = data.filter((p) => p.brandName === filterValues.brand);
    }

    //filter product
    if (filterValues.product === "All") {
      console.log(data);
    } else {
      console.log(filterValues.product);
    }

    // Swal.fire({
    //   icon: "info",
    //   title: "Filters Applied!",
    //   text: JSON.stringify(filterValues, null, 2),
    // });
    generateProductPDF(productData);
  };

  return (
    <div className=" ">
      <div className="bg-white border border-gray-200 rounded shadow-sm lg:p-6 p-2 flex flex-col gap-5">
        {/* Top Section */}
        <form action="submit">
          <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center gap-4">
            <div className="lg:flex w-full flex-wrap gap-6 items-center">
              {/* Date Range */}
              <div className="lg:flex items-center gap-3">
                <div className="flex gap-2  lg:flex-none">
                  <FiCalendar className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">
                    Date Range:
                  </label>
                </div>

                <select
                  value={filterValues.dateRange}
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                  className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {ranges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Custom Range */}
              {filterValues.dateRange === "Custom Range" && (
                <div className="lg:flex items-center gap-5">
                  <div className="lg:flex items-center gap-2  mt-2 lg:mt-0">
                    <label className="text-gray-700 font-medium">From:</label>
                    <input
                      type="date"
                      value={filterValues.fromDate}
                      onChange={(e) => handleFromDateChange(e.target.value)}
                      className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="lg:flex items-center gap-2">
                    <label className="text-gray-700 font-medium">To:</label>
                    <input
                      type="date"
                      value={filterValues.toDate}
                      onChange={(e) => handleToDateChange(e.target.value)}
                      className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setFilterValues({ category: "Select Category" });
                setVisibleBrand(false);
                setVisibleProduct(false);
                setVisibleStatus(false);
              }}
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          {/* Dropdown Filters */}
          <div className="lg:flex flex-wrap gap-10 ">
            {/* Category */}
            <div className="lg:flex items-center gap-3">
              <div className="flex gap-2">
                <FiBox className="text-blue-600 text-xl" />
                <label className="text-gray-700 font-medium">Category:</label>
              </div>
              <select
                value={filterValues.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option>Select Category</option>
                <option value="All">All</option>
                {categoryData.map((cat) => (
                  <option key={cat.catID} value={cat.catID}>
                    {cat.catID + " - " + cat.catName}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            {visibleBrand && (
              <div className="lg:flex items-center gap-3  mt-2 lg:mt-0">
                <div className="flex gap-2">
                  <FiActivity className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">Brand:</label>
                </div>
                <select
                  value={filterValues.brand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Select Brand</option>
                  <option>All</option>
                  {brandList.map((b, i) => (
                    <option key={i} value={b.brandName}>
                      {b.brandName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Product */}
            {visibleProduct && (
              <div className="lg:flex items-center gap-3 mt-2 lg:mt-0">
                <div className="flex gap-2">
                  <FiCreditCard className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">Product:</label>
                </div>
                <select
                  value={filterValues.product}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Select Product</option>
                  <option>All</option>
                  {productList.map((p, i) => (
                    <option key={i} value={p.pID}>
                      {p.pID + " - " + p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Status */}
            {visibleStatus && (
              <div className="lg:flex items-center gap-3 mt-2 lg:mt-0">
                <div className="flex gap-2">
                  <FiCreditCard className="text-blue-600 text-xl" />
                  <label className="text-gray-700 font-medium">Status:</label>
                </div>
                <select
                  value={filterValues.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Select Status</option>
                  <option>All</option>
                  <option>Available</option>
                  <option>Low Stock</option>
                  <option>Stock Added</option>
                  <option>Out Of Stock</option>
                </select>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
