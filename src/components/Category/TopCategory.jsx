import { DataContext } from "@/Context Api/ApiContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const TopCategory = () => {
  const { updateApi, categoryData } = useContext(DataContext);

  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [search, setSearch] = useState("");

  //submit top category
  const submit = async (catID, action) => {
    setShowModal(false);

    try {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we update the product status.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const data = {
        catID: catID,
        action: action,
      };

      await axios.patch("https://fabribuzz.onrender.com/api/category", data);

      updateApi();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Status updated successfully!",
        timer: 1000,
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

  return (
    <div>
      <div className="relative max-w-xl mx-auto mt-5">
        <div className="lg:py-5 overflow-x-auto">
          <table className="w-full border border-gray-300 rounded bg-white whitespace-nowrap">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-2 border px-5 text-center">SN</th>
                <th className="p-2 border px-10 text-center">Cat ID</th>
                <th className="p-2 border px-5 text-center">Cat Name</th>
                <th className="p-2 border text-center">Top Category</th>
                <th className="p-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((item, inx) => (
                <tr key={item.pID} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{++inx}</td>
                  <td className="p-2 border text-center">{item.catID}</td>
                  <td className="p-2 border">{item.catName}</td>
                  <td className="p-2 border mx-5 text-center">
                    {item.TopCategory === true ? "True" : "False"}{" "}
                  </td>
                  <td className="p-2 border text-center ">
                    <button
                      onClick={() => sbmit(item.pID, "remove")}
                      className="bg-red-500 text-white px-4 py-[2px] text-sm rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3  rounded"
          >
            Add More
          </button>
        </div>
        {/* model */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 px-2 lg:px-0 flex justify-center items-center z-50">
            <div className="bg-white lg:w-1/4 p-5 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-3 text-center">
                Add Top Category
              </h2>

              <input
                type="text"
                placeholder="Search category by name or ID"
                className="w-full border px-3 py-2 rounded mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="max-h-60 overflow-y-auto border rounded">
                {categoryData
                  .filter(
                    (p) =>
                      p.catName.toLowerCase().includes(search.toLowerCase()) ||
                      p.catID.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.catID}
                      className="p-2 border-b flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="lg:hidden">
                        {item.catID} <br /> {item.catName}
                      </span>
                      <span className="hidden lg:flex">
                        {item.catID} - {item.catName}
                      </span>
                      <button
                        onClick={() => submit(item.catID, true)}
                        className="bg-green-500 text-white px-5 py-1 rounded hover:bg-green-600"
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
    </div>
  );
};
