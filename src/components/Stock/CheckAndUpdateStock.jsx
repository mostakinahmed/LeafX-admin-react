import React, { useState } from "react";

const mockProducts = [
  {
    id: "P001",
    name: "Wireless Earbuds m",
    sku: "SKU0102032345",
    total: 120,
    available: 95,
    sold: 25,
    description: "High-quality wireless earbuds with noise cancellation.",
  },
  {
    id: "P002",
    name: "Smart Watch",
    sku: "SKU0106032345",
    total: 80,
    available: 50,
    sold: 30,
    description: "Fitness tracking smart watch with OLED display.",
  },
  {
    id: "P003",
    name: "Bluetooth Speaker",
    sku: "SKU0102032345",
    total: 200,
    available: 180,
    sold: 20,
    description: "Portable Bluetooth speaker with deep bass.",
  },
];

export default function CheckAndUpdateStock() {
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
        <div className="flex items-center gap-2 md:mb-4 mb-3 mr-2">
          <input
            type="text"
            placeholder="Enter Product-ID or SKU-ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <button className=" justify- px-2 lg:w-[110px] py-2 rounded text-white font-semibold bg-yellow-400 hover:bg-yellow-500">
                Add Stock
              </button>
            </div>

            {/* info div */}
            <div class="bg-white w-full overflow-hidden">
              <img
                src="https://img.drz.lazcdn.com/static/bd/p/bf01ecf6cf24b6048d23bc175068e9d3.jpg_720x720q80.jpg"
                alt="OnePlus Nord 3000"
                class="w-45 h-45 object-cover ml-5"
              />

              <div class="px-6 mt-1 mb-2 md:mb-0 space-y-1">
                <h2 class="text-xl font-bold text-gray-900">
                  OnePlus Nord 3000
                </h2>
                <p class="text-sm text-gray-500">
                  Product ID:{" "}
                  <span class="font-medium text-gray-800">P000001</span>
                </p>
                <p class="text-sm text-gray-500">
                  Brand: <span class="font-medium text-gray-800">OnePlus</span>
                </p>
                <p class="text-sm text-gray-500">
                  Category: <span class="font-medium text-gray-800">C001</span>
                </p>

                <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div>
                    <p class="text-sm text-gray-500">Price</p>
                    <p class="text-lg font-semibold text-green-600">$399</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Stock</p>
                    <p class="text-lg font-semibold text-blue-600">50</p>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-100">
                  <p class="text-sm text-gray-500 mb-1">Specifications:</p>
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
          <p className="text-gray-500 mt-6">No product selected.</p>
        )}
      </div>

      {/* Middle Panel */}
      <div className="md:w-1/2 mt-2 md:mt-0 border-r bg-white rounded">
        <h2 className="text-xl p-1 bg-blue-100 font-semibold mb-3">
          📋 SKU List
        </h2>

        {selectedProduct ? (
          <div className="grid grid-cols-3 gap-3 mb-3 md:px-2 mr-2 md:mr-0 ">
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
        <div className="md:mr-4 mr-2">
          <table className="w-full min-w-auto border border-gray-200 rounded md:mx-2 overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr className="flex justify-between">
                <th className="py-2 px-4">SKU</th>
                <th className="py-2 px-4 md:mr-7 ">Available</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((prod) => (
                <tr
                  key={prod.sku}
                  className="cursor-pointer border-b hover:bg-blue-50 transition flex justify-between"
                  onClick={() => handleSelectSKU(prod.sku)}
                >
                  <td className="py-1 px-4 text-blue-600 font-medium">
                    {prod.sku}
                  </td>

                  <td className="py-2 px-4 md:mr-15 font-semibold text-xs">
                    YES
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-white rounded">
        <h2 className="text-xl p-1 mt-3 md:mt-0 bg-blue-100 font-semibold mb-3 ">
          📦 Stock Overview
        </h2>

        <div class=" ml-2 bg-white rounded p-5">
          <h3 class="text-lg text-center underline font-semibold text-gray-800 mb-4">
            SKU Information
          </h3>

          <div class="space-y-2">
            <div class="flex justify-between border-b">
              <span class="text-gray-600 font-medium">SKU ID :</span>
              <span class="text-gray-600 ">SKU0102032345</span>
            </div>

            <div class="flex justify-between border-b">
              <span class="text-gray-600 font-medium">Status :</span>
              <span class="text-green-600 font-semibold">True</span>
            </div>

            <div class="flex justify-between border-b">
              <span class="text-gray-600 font-medium">OID :</span>
              <span class=" text-gray-600 ">OID-1000967890</span>
            </div>

            <div className="border-b">
              <span class="text-gray-600 font-medium block">Comment :</span>
              <p class="text-gray-700 text-sm mt-1">
                Item is in stock and ready to ship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
