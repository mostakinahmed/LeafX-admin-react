import { DataContext } from "@/Context Api/ApiContext";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch, FiList, FiBox } from "react-icons/fi"; // Feather search icon
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

export default function CheckAndUpdateStock() {
  const { productData, stockData, updateApi } = useContext(DataContext);

  console.log(stockData);

  const [searchId, setSearchId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [currentStock, setCurrentStock] = useState(false);
  const [currentSKU, setCurrentSKU] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    skuID: "",
    comment: "",
  });

  //handle Form Data change
  const handleSearch = () => {
    // First, try to find by Product ID
    let foundProduct = productData.find((p) => p.pID === searchId);
    let foundStock = null;

    // If not found by Product ID, try to find by SKU ID
    if (!foundProduct) {
      const foundStockItem = stockData.find((stock) =>
        Object.values(stock.SKU).some((sku) => sku.skuID === searchId)
      );

      if (foundStockItem) {
        foundProduct = productData.find((p) => p.pID === foundStockItem.pID);
        foundStock = foundStockItem.SKU;
      }
    } else {
      // Found by Product ID, get stock
      foundStock = stockData.find(
        (stock) => stock.pID === foundProduct.pID
      ).SKU;
    }

    if (foundProduct && foundStock) {
      setCurrentStock(foundStock);
      setSelectedProduct(foundProduct);

      // Directly find the SKU from the stock we just got
      const selectSKU = Object.values(foundStock).find(
        (s) => s.skuID === searchId
      );
      setCurrentSKU(selectSKU || null);
    } else {
      setCurrentStock(false);
      setSelectedProduct(false);
      setCurrentSKU(false);
    }
  };

  //Show SKU DATA - Search
  const handleSelectSKU = (skuID) => {
    const selectSKU = Object.values(currentStock).find(
      (s) => s.skuID === skuID
    );
    setCurrentSKU(selectSKU);
  };

  useEffect(() => {
    if (selectedProduct && stockData) {
      const updatedStock =
        stockData.find((stock) => stock.pID === selectedProduct.pID)?.SKU ||
        false;
      setCurrentStock(updatedStock);
    }
  }, [stockData, selectedProduct]);

  //add stock button
  const addStock = async (e) => {
    e.preventDefault();

    try {
      // setSubmitLoader(true);
      setSuccess(true);
      const data = {
        pID: selectedProduct.pID,
        skuID: formData.skuID,
        comment: formData.comment,
      };

      const res = await axios.post(
        "https://fabribuzz.onrender.com/api/stock/add-stock",
        data
      );
      updateApi();
      setFormData({ skuID: "", comment: "" });
      setSuccess(false);
    } catch (error) {
      console.error("Error adding stock:", error);
    } finally {
      setSuccess(false);
    }
  };

  //find total, available, sold
  const totalStock = Object.keys(currentStock).length;
  const availableStock = Object.values(currentStock).filter(
    (item) => item.status === true
  ).length;

  return (
    <div className="md:flex border-t min-h-screen mt-3">
      {/* Left Panel */}
      <div className=" border-r md:w-1/2 bg-white rounded ">
        <h2 className="relative text-xl p-1 bg-blue-100 font-semibold mb-3 flex items-center">
          <FiSearch className="mr-2 text-gray-600" />
          Search Product
        </h2>

        <div className="flex items-center gap-2 md:mb-4 mb-3 mr-2">
          <input
            type="text"
            placeholder="Enter Product-ID or SKU-ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white lg:w-[128px] w-[147px] px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {selectedProduct ? (
          <div className="md:mt-8 mr-2">
            <div className=" flex justify-between bg-gray-200">
              <h3 className="text-lg mt-2  font-semibold px-2">
                Product Details
              </h3>
              <button
                onClick={() => {
                  setToggle(false);
                }}
                className=" justify- px-2 lg:w-[110px] py-2 rounded text-white font-semibold bg-yellow-400 hover:bg-yellow-500"
              >
                Add Stock
              </button>
            </div>

            {/* info div */}
            <div class="bg-white w-full overflow-hidden">
              <div className="w-full flex gap-4 bg-white p-2 rounded">
                {/* Product Image */}
                <div className="w-1/3 flex justify-center">
                  <img
                    src="https://img.drz.lazcdn.com/static/bd/p/bf01ecf6cf24b6048d23bc175068e9d3.jpg_720x720q80.jpg"
                    alt={selectedProduct.name}
                    className="w-40 h-40 p-2 object-cover rounded border"
                  />
                </div>

                {/* Product Info */}
                <div className="w-2/3 space-y-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">
                      Product ID:
                    </span>{" "}
                    {selectedProduct.pID}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Brand:</span>{" "}
                    {selectedProduct.brandName}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Category:</span>{" "}
                    {selectedProduct.category}
                  </p>

                  {/* Divider bar */}
                  <div className="w-full h-1 bg-blue-500 rounded mt-2">
                    <div class="flex justify-between items-center pt-2">
                      <div>
                        <p class="text-sm text-gray-500">Price</p>
                        <p class="text-lg font-semibold text-green-600">
                          {selectedProduct.price}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Stock</p>
                        <p class="text-lg font-semibold text-blue-600">50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-6 mt-1 mb-2 md:mb-0 space-y-1">
                <div class="mt-5 border-t border-gray-100">
                  <p class=" text-gray-500 mb-1">Specifications:</p>
                  <ul class="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>Example: 8GB RAM</li>
                    <li>Example: 128GB Storage</li>
                    <li>Example: 5000mAh Battery</li>
                  </ul>
                </div>

                <div class="pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <p>
                    Created:{" "}
                    <span class="text-gray-600">2025-10-05 02:58:12</span>
                  </p>
                  <p>
                    Updated:{" "}
                    <span class="text-gray-600">2025-10-07 14:26:11</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 mr-2 h-50 flex justify-center items-center text-2xl bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
            ⚠️ Product Info
          </div>
        )}
      </div>

      {/* Middle Panel */}
      <div className="md:w-1/2 mt-2 md:mt-0 border-r bg-white rounded">
        <h2 className="flex items-center text-xl p-1 bg-blue-100 font-semibold mb-3">
          <FiList className="mr-2 text-gray-600" size={24} />
          SKU List
        </h2>

        {currentStock && (
          <div className="grid grid-cols-3 gap-3 mb-3 md:px-2 mr-2 md:mr-0 ">
            <div className="bg-blue-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Total Stock</h4>
              <p className="text-2xl font-bold text-blue-600"> {totalStock}</p>
            </div>
            <div className="bg-green-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Available Stock</h4>
              <p className="text-2xl font-bold text-green-600">
                {" "}
                {availableStock}
              </p>
            </div>
            <div className="bg-red-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Sold Item</h4>
              <p className="text-2xl font-bold text-red-600">
                {" "}
                {totalStock - availableStock}
              </p>
            </div>
          </div>
        )}

        <div className="md:mr-2 mr-2 ml-2">
          <div className="h-[600px] overflow-y-auto rounded">
            <table className="w-full min-w-auto">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="flex justify-between">
                  <th className="py-2 px-4">SKU-ID</th>
                  <th className="py-2 px-4">Available</th>
                </tr>
              </thead>
              {!currentStock && (
                <div className="mt-4 p-3 h-50 flex justify-center items-center text-2xl bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
                  ⚠️ SKU List
                </div>
              )}
              <tbody>
                {Object.values(currentStock).map((sku) => (
                  <tr
                    key={sku.skuID}
                    className="cursor-pointer border-b hover:bg-blue-50 transition flex justify-between"
                    onClick={() => {
                      handleSelectSKU(sku.skuID);
                      setToggle(true);
                    }}
                  >
                    <td className="py-1 px-4 text-blue-600 font-medium">
                      {sku.skuID}
                    </td>
                    <td
                      className={`py-2 px-4 font-semibold text-xs ${
                        sku.status ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {sku.status ? "YES" : "SOLD"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-white rounded">
        {toggle ? (
          <>
            <h2 className="flex items-center text-xl p-1 mt-3 md:mt-0 bg-blue-100 font-semibold mb-3">
              <FiBox className="mr-2 text-gray-600" size={24} />
              Stock Overview
            </h2>

            <div class=" md:ml-2 md:mt-5 bg-white">
              <h3 class="text-lg text-center underline font-semibold text-gray-800 mb-5">
                SKU Information
              </h3>

              {currentSKU ? (
                <div class="space-y-2 px-6 py-5">
                  <div class="flex justify-between border-b">
                    <span class="text-gray-600 font-medium">SKU ID :</span>
                    <span class="text-gray-600 mr-1">{currentSKU.skuID}</span>
                  </div>

                  <div class="flex justify-between border-b">
                    <span class="text-gray-600 font-medium">Status :</span>

                    {currentSKU.status ? (
                      <span class="text-green-600 font-semibold mr-1">
                        True
                      </span>
                    ) : (
                      <span class="text-red-600 font-semibold mr-1">False</span>
                    )}
                  </div>

                  <div class="flex justify-between border-b">
                    <span class="text-gray-600 font-medium">OID :</span>

                    {currentSKU.OID ? (
                      <span class="text-green-600 font-semibold mr-1">
                        {currentSKU.OID}
                      </span>
                    ) : (
                      <span class="text-red-600 text-sm font-semibold mr-1">
                        NULL
                      </span>
                    )}
                  </div>

                  <div className="border border-gray-200  p-1 bg-blue-100">
                    <span className="text-gray-700 text-lg mb-1">Comment:</span>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {currentSKU.comment || "No comment available."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 h-50 flex justify-center items-center text-2xl bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
                  ⚠️ SKU Info
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="flex items-center text-xl p-1 mt-3 md:mt-0 bg-blue-100 font-semibold mb-3">
              <FiBox className="mr-2 text-gray-600" size={24} />
              Update Stock
            </h2>
            <div className="mt-3 ml-2 bg-blue-50 border border-blue-200 rounded p-4 relative overflow-hidden">
              {/* ✅ Loader overlay */}
              {success && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-20">
                  <div className="bg-white md:p-4 md:w-[220px] rounded-lg shadow-md border flex flex-col items-center animate-fadeIn">
                    <FaSpinner className="text-green-500 text-4xl mb-3 animate-spin" />
                    <p className="text-gray-700 font-semibold mb-3">
                      Stock Adding!
                    </p>
                  </div>
                </div>
              )}

              {/* ✅ Blur this content when loading */}
              <div
                className={`${success ? "blur-sm pointer-events-none" : ""}`}
              >
                <h2 className="text-lg text-center font-semibold text-blue-700 mb-3">
                  + Add New Stock
                </h2>

                <form onSubmit={addStock}>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU - ID
                      </label>
                      <input
                        type="text"
                        name="skuID"
                        value={formData.skuID}
                        onChange={handleFormDataChange}
                        placeholder="Enter SKU ID"
                        required
                        className="w-full border border-gray-400 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment - primary info
                      </label>
                      <textarea
                        placeholder="Enter comment"
                        rows={5}
                        name="comment"
                        value={formData.comment}
                        onChange={handleFormDataChange}
                        required
                        className="w-full border border-gray-400 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setToggle(true)}
                        className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded font-medium hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
