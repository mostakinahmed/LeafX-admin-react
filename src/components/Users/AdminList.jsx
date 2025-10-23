import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaEye } from "react-icons/fa";

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const adminData = [
    {
      id: "A001",
      fullName: "Mostakin Ahmed",
      username: "mostakin",
      email: "mostakin@example.com",
      phone: "+8801789001234",
      role: "Super Admin",
      status: "Active",
      createdAt: "2025-10-01",
      lastLogin: "2025-10-18 14:32",
    },
    {
      id: "A002",
      fullName: "Rafi Uddin",
      username: "rafi",
      email: "rafi@example.com",
      phone: "+8801899005678",
      role: "Admin",
      status: "Suspended",
      createdAt: "2025-09-28",
      lastLogin: "2025-10-17 09:10",
    },
  ];

  // Filter admins by username or phone
  const filteredAdmins = adminData.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone.includes(searchTerm) ||
      admin.id.includes(searchTerm.toUpperCase())
  );

  return (
    <div className="bg-white rounded">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-3">
        <h2 className="text-xl font-semibold text-gray-700">Admin List</h2>

        {/* 🔍 Search Box */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className=" overflow-x-auto">
        {/* 🧾 Admin Table */}
        <table className="w-full border border-gray-200 text-sm text-left whitespace-nowrap ">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs whitespace-nowrap">
            <tr>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Full Name</th>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Role</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Created</th>
              <th className="py-3 px-4 border-b">Last Login</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-4 border-b">{admin.id}</td>
                  <td className="py-3 px-4 border-b">{admin.fullName}</td>
                  <td className="py-3 px-4 border-b">{admin.username}</td>
                  <td className="py-3 px-4 border-b">{admin.email}</td>
                  <td className="py-3 px-4 border-b">{admin.phone}</td>
                  <td className="py-3 px-4 border-b">{admin.role}</td>
                  <td
                    className={`py-3 px-4 border-b font-medium ${
                      admin.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {admin.status}
                  </td>
                  <td className="py-3 px-4 border-b">{admin.createdAt}</td>
                  <td className="py-3 px-4 border-b">{admin.lastLogin}</td>
                  <td className="py-1 px-4 border-b text-center space-x-3">
                    {/* <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button> */}
                    <button className="text-yellow-500 hover:text-yellow-700 text-xl">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-xl">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No matching admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
