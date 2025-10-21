import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const CategoryList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([
    {
      catID: "C001",
      catName: "Mobile",
      specifications: [
        "Hardware",
        "CPU",
        "GPU",
        "Display",
        "Battery",
        "Network",
        "Software",
        "Ports",
        "Audio",
        "Dimensions",
        "Color",
      ],
      createdAt: "2025-10-04T12:31:14.584Z",
    },
    {
      catID: "C002",
      catName: "Laptop",
      specifications: [
        "Processor",
        "RAM",
        "Storage",
        "Display",
        "Battery",
        "Graphics",
      ],
      createdAt: "2025-10-10T15:00:00.000Z",
    },
  ]);

  let sn = 1;

  return (
    <div className="bg-white w-full ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-3">
        <h2 className="text-xl mt-4 lg:mt-0 font-semibold text-gray-700">All Category</h2>

        {/* 🔍 Search Box */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 whitespace-nowrap">
          <thead className="bg-gray-200 text-gray-700 text-xs uppercase">
            <tr className="">
              <th className="px-4 py-3 border-b text-left">S/N</th>
              <th className="px-4 py-3 border-b text-left">Category ID</th>
              <th className="px-4 py-3 border-b text-left">Category Name</th>
              <th className="px-4 py-3 border-b text-left">Specifications</th>
              <th className="px-4 py-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cat) => (
              <tr
                key={cat.catID}
                className="hover:bg-gray-100 transition duration-150 border-b"
              >
                <td className="px-4 py-2">{sn++}</td>
                <td className="px-4 py-2">{cat.catID}</td>
                <td className="px-4 py-2 font-medium">{cat.catName}</td>
                <td className="px-4 py-2  text-gray-600 max-w-[300px] truncate">
                  {cat.specifications.join(", ")}
                </td>

                <td className="px-4 py-2 text-center flex justify-center gap-3">
                  <button className="text-yellow-500 hover:text-yellow-700 text-xl">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-xl">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
