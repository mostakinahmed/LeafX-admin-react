import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import { DataContext } from "@/Context Api/ApiContext";

export const StatusManagement = () => {
  const { productData } = useContext(DataContext);
  const [selected, setSelected] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // Fallback Dummy Data (if API has no data)
  const dummyProducts = [
    {
      pID: "P001",
      name: "Gaming Mouse",
      price: { selling: 1200 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isDiscount: true,
        isBestSelling: false,
        isNewArrival: false,
      },
    },
    {
      pID: "P002",
      name: "Keyboard RGB",
      price: { selling: 2200 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isDiscount: false,
        isBestSelling: true,
        isNewArrival: false,
      },
    },
    {
      pID: "P003",
      name: "Laptop Stand",
      price: { selling: 900 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isDiscount: false,
        isBestSelling: false,
        isNewArrival: true,
      },
    },
  ];

  const mainData = productData.length > 0 ? productData : dummyProducts;

  // -------------------------
  // Filter selected category
  // -------------------------
  const filterData = mainData.filter((item) => {
    if (selected === "featured") return item.status.isFeatured;
    if (selected === "flash") return item.status.isFlashSale;
    if (selected === "discount") return item.status.isDiscount;
    if (selected === "bestSelling") return item.status.isBestSelling;
    if (selected === "newArrival") return item.status.isNewArrival;
    return false;
  });

  const titleMap = {
    none: "No Status Selected",
    featured: "Featured Product",
    flash: "Flash Sale / Hot Deals",
    discount: "Discount Products",
    bestSelling: "Best Selling Products",
    newArrival: "New Arrival Products",
  };

  const addProduct = (productID) => {
    alert(`Added product ${productID} to ${titleMap[selected]}`);
    setShowModal(false);
  };

  const removeProduct = (productID) => {
    alert(`Removed product ${productID} from ${titleMap[selected]}`);
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <div>
      <Navbar pageTitle="Status Management" />

      <div className="flex gap-20 pt-2">
        {/* Dropdown */}
        <div className="w-1/4 bg-white shadow rounded p-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border px-3 py-2 rounded outline-none focus:ring w-full"
          >
            <option value="none">None</option>
            <option value="featured">Featured Product</option>
            <option value="flash">Flash Sale / Hot Deals</option>
            <option value="discount">Discount</option>
            <option value="bestSelling">Best Selling</option>
            <option value="newArrival">New Arrival</option>
          </select>
        </div>

        {/* Title */}
        <div className="w-1/2 bg-white shadow rounded flex justify-center items-center">
          <h1 className="font-semibold text-2xl text-gray-800">
            {titleMap[selected]}
          </h1>
        </div>

        {selected !== "none" && (
          <div className="flex  mb-4 ">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
            >
              + Add More Product
            </button>
          </div>
        )}
      </div>

      {/* TABLE SECTION */}
      {selected !== "none" && (
        <div className="py-5">
          {/* Add Button */}

          {/* Table */}
          {filterData.length > 0 ? (
            <table className="w-full border border-gray-300 rounded bg-white">
              <thead className="bg-gray-200">
                <tr className="text-left">
                  <th className="p-2 border">Product ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {filterData.map((item) => (
                  <tr key={item.pID} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.pID}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.price.selling} Tk</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => removeProduct(item.pID)}
                        className="bg-red-500 text-white px-4 py-[2px] rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-4">
              No product found for this category.
            </p>
          )}
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] p-5 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-3">
              Add Product to {titleMap[selected]}
            </h2>

            <input
              type="text"
              placeholder="Search product by name or ID"
              className="w-full border px-3 py-2 rounded mb-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="max-h-60 overflow-y-auto border rounded">
              {mainData
                .filter(
                  (p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.pID.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item.pID}
                    className="p-2 border-b flex justify-between items-center hover:bg-gray-50"
                  >
                    <span>
                      {item.pID} - {item.name}
                    </span>
                    <button
                      onClick={() => addProduct(item.pID)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusManagement;
