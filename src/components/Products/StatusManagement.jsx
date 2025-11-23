import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import { DataContext } from "@/Context Api/ApiContext";
import axios from "axios";
import Swal from "sweetalert2";

export const StatusManagement = () => {
  const { productData, updateApi } = useContext(DataContext);
  const [selected, setSelected] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [disModel, setDisModel] = useState(false);
  const [disModel2, setDisModel2] = useState(false);
  const [currData, setCurrData] = useState("");
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState("");

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
    if (selected === "isFeatured") return item.status.isFeatured;
    if (selected === "isFlashSale") return item.status.isFlashSale;
    if (selected === "discount") return item.price.discount;
    if (selected === "isBestSelling") return item.status.isBestSelling;
    if (selected === "isNewArrival") return item.status.isNewArrival;
    return false;
  });

  const titleMap = {
    none: "No Status Selected",
    isFeatured: "Featured Product",
    isFlashSale: "Flash Sale / Hot Deals",
    discount: "Discount Products",
    isBestSelling: "Best Selling Products",
    isNewArrival: "New Arrival Products",
  };

  const submit = async (productID, action) => {
    setShowModal(false);
    let value;
    try {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we update the product status.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      if (discount) {
        value = action;
      } else {
        value = action === "remove" ? false : true;
      }

      const data = {
        pID: productID,
        value,
        key: selected,
      };
     

      // Wait for the API response
      const res = await axios.patch(
        "https://fabribuzz.onrender.com/api/product",
        data
      );

      // Update UI after successful response
      updateApi();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Status updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status. Please try again.",
      });
    }
  };

  const addDiscount = async (data) => {
    setDisModel(false);
    setCurrData(data);
    setDisModel2(true);
    // try {
    //   Swal.fire({
    //     title: "Processing...",
    //     text: "Please wait while we add the discount.",
    //     allowOutsideClick: false,
    //     didOpen: () => {
    //       Swal.showLoading();
    //     },
    //   });

    //   const data = {
    //     pID: productID,
    //   };
    //   console.log(data);

    //   // Wait for the API response
    //   const res = await axios.patch(
    //     "https://fabribuzz.onrender.com/api/product/discount",
    //     data
    //   );

    //   // Update UI after successful response
    //   updateApi();

    //   Swal.fire({
    //     icon: "success",
    //     title: "Success",
    //     text: "Discount added successfully!",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // } catch (error) {
    //   console.error(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Failed to add discount. Please try again.",
    //   });
    // }
  };
  // Render
  // -------------------------
  return (
    <div>
      <Navbar pageTitle="Status Management" />

      <div className="flex flex-col lg:flex-row lg:gap-20 gap-3 pt-2">
        {/* Dropdown */}
        <div className="lg:w-1/4 w-full bg-white shadow rounded p-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border px-3 py-2 rounded outline-none focus:ring w-full"
          >
            <option value="none">None</option>
            <option value="isFeatured">Featured Product</option>
            <option value="isFlashSale">Flash Sale / Hot Deals</option>
            <option value="discount">Discount</option>
            <option value="isBestSelling">Best Selling</option>
            <option value="isNewArrival">New Arrival</option>
          </select>
        </div>

        {/* Title */}
        <div className="lg:w-1/2 w-full h-10 lg:h-auto bg-white shadow rounded flex justify-center items-center">
          <h1 className="font-semibold text-2xl text-gray-800">
            {titleMap[selected]}
          </h1>
        </div>

        {selected == "none" ||
          (selected !== "discount" && (
            <div className="flex  mb-4 ">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 w-full text-white px-5 py-2 rounded shadow hover:bg-blue-700"
              >
                + Add More Product
              </button>
            </div>
          ))}

        {selected === "discount" && (
          <div className="flex  mb-4 ">
            <button
              onClick={() => setDisModel(true)}
              className="bg-blue-600 w-full text-white px-5 py-2 rounded shadow hover:bg-blue-700"
            >
              + Add Discount
            </button>
          </div>
        )}
      </div>

      {/* TABLE SECTION */}
      {selected !== "none" && (
        <div className="lg:py-5">
          {/* Add Button */}

          {/* Table */}
          {filterData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded bg-white whitespace-nowrap">
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
                          onClick={() => submit(item.pID, "remove")}
                          className="bg-red-500 text-white px-4 py-[2px] rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-4">
              No product found for this category.
            </p>
          )}
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 px-2 lg:px-0 flex justify-center items-center z-50">
          <div className="bg-white lg:w-1/3 p-5 rounded shadow-lg">
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
                    <span className="lg:hidden">
                      {item.pID} <br /> {item.name}
                    </span>
                    <span className=" hidden lg:flex">
                      {item.pID} - {item.name}
                    </span>
                    <button
                      onClick={() => submit(item.pID, "add")}
                      className="bg-green-500 text-white px-5  py-1 rounded hover:bg-green-600"
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

      {/* ADD Discount MODAL */}
      {disModel && (
        <div className="fixed inset-0 bg-black/40 lg:px-0 px-2 flex justify-center items-center z-50">
          <div className="bg-white lg:w-1/3 p-5 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Add Discount
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
                    <span className="lg:hidden">
                      {item.pID} <br /> {item.name}
                    </span>
                    <span className=" hidden lg:flex">
                      {item.pID} - {item.name}
                    </span>

                    <button
                      onClick={() => addDiscount(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Add Discount
                    </button>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setDisModel(false)}
              className="mt-3 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {disModel2 && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded shadow-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Apply Discount</h2>

            {currData ? (
              <div className="flex flex-col gap-3">
                {/* Selected Product */}
                <div className="flex items-center gap-3 border p-2 rounded">
                  <img
                    src={currData.images[0]}
                    alt={currData.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{currData.name}</p>
                    <p className="text-gray-500">
                      Price: {currData.price.selling} Tk
                    </p>
                  </div>
                </div>

                {/* Discount Input */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">
                    Discount (Tk)
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="border px-3 py-2 rounded outline-none focus:ring"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setDisModel2(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit(currData.pID, discount)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p>No product selected.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusManagement;
