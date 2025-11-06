import React, { useState } from "react";

const mockProducts = [
  {
    id: "P001",
    name: "Wireless Earbuds m",
    sku: "SKU-001",
    total: 120,
    available: 95,
    sold: 25,
    description: "High-quality wireless earbuds with noise cancellation.",
  },
  {
    id: "P002",
    name: "Smart Watch",
    sku: "SKU-002",
    total: 80,
    available: 50,
    sold: 30,
    description: "Fitness tracking smart watch with OLED display.",
  },
  {
    id: "P003",
    name: "Bluetooth Speaker",
    sku: "SKU-003",
    total: 200,
    available: 180,
    sold: 20,
    description: "Portable Bluetooth speaker with deep bass.",
  },
];

export default function CheckStock() {
  const [searchId, setSearchId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(true);

  const handleSearch = () => {
    const found = mockProducts.find((p) => p.id === searchId);
    setSelectedProduct(found || null);
  };

  const handleSelectSKU = (sku) => {
    const found = mockProducts.find((p) => p.sku === sku);
    setSelectedProduct(found);
  };

  return (
    <div className="md:flex border-t min-h-screen mt-3">
      {/* Left Panel */}
      <div className=" border-r md:w-1/2 bg-white rounded ">
        <h2 className="text-xl p-1 bg-blue-100 font-semibold mb-3">
          🔍 Search Product
        </h2>
        <div className="flex items-center gap-2 mb-4 mr-3">
          <input
            type="text"
            placeholder="Enter Product ID (e.g. P001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {selectedProduct ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p>
                <strong>Name:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>ID:</strong> {selectedProduct.id}
              </p>
              <p>
                <strong>SKU:</strong> {selectedProduct.sku}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No product selected.</p>
        )}
      </div>

      {/* Middle Panel */}
      <div className="md:w-1/2 mt-2 md:mt-0 border-r bg-white rounded">
        <h2 className="text-xl p-1 bg-blue-100 font-semibold mb-3">
          📋 SKU List
        </h2>

        {selectedProduct ? (
          <div className="grid grid-cols-3 gap-4 mb-3 md:px-2 mr-2 md:mr-0 ">
            <div className="bg-blue-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Total Stock</h4>
              <p className="text-2xl font-bold text-blue-600">
                {" "}
                10
                {selectedProduct.total}
              </p>
            </div>
            <div className="bg-green-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Available Stock</h4>
              <p className="text-2xl font-bold text-green-600">
                {" "}
                20
                {selectedProduct.available}
              </p>
            </div>
            <div className="bg-red-50 p-1 rounded text-center">
              <h4 className="text-gray-500 text-sm">Sold Stock</h4>
              <p className="text-2xl font-bold text-red-600">
                {" "}
                60
                {selectedProduct.sold}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            Select a product to see stock details.
          </p>
        )}

        {/* <h3 className="text-lg font-semibold mb-2">
          📋 SKU / Serial Number List
        </h3> */}
        <div className="mr-4">
          <table className="w-full min-w-auto border border-gray-200 rounded mx-2 overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4">SKU</th>
                <th className="py-2 px-4">Available</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((prod) => (
                <tr
                  key={prod.sku}
                  className="cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => handleSelectSKU(prod.sku)}
                >
                  <td className="py-2 px-4 text-blue-600 font-medium">
                    {prod.sku}
                  </td>

                  <td className="py-2 px-4">{prod.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-white rounded">
        <h2 className="text-xl p-1 bg-blue-100 font-semibold mb-3 ">
          📦 Stock Overview
        </h2>

        {selectedProduct ? (
          <div className="grid grid-cols-3 gap-4 mb-6 px-2">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <h4 className="text-gray-500 text-sm">Total Stock</h4>
              <p className="text-2xl font-bold text-blue-600">
                {" "}
                0{selectedProduct.total}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <h4 className="text-gray-500 text-sm">Available Stock</h4>
              <p className="text-2xl font-bold text-green-600">
                {selectedProduct.available}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl text-center">
              <h4 className="text-gray-500 text-sm">Sold Stock</h4>
              <p className="text-2xl font-bold text-red-600">
                {selectedProduct.sold}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            Select a product to see stock details.
          </p>
        )}

        <h3 className="text-lg font-semibold mb-2">
          📋 SKU / Serial Number List
        </h3>
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">SKU</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Available</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((prod) => (
              <tr
                key={prod.sku}
                className="cursor-pointer hover:bg-blue-50 transition"
                onClick={() => handleSelectSKU(prod.sku)}
              >
                <td className="py-2 px-4 text-blue-600 font-medium">
                  {prod.sku}
                </td>
                <td className="py-2 px-4">{prod.name}</td>
                <td className="py-2 px-4">{prod.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
