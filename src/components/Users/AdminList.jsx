import { useContext, useState } from "react";
import { DataContext } from "@/Context Api/ApiContext";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import UpdateAdmin from "./UpdateAdmin.jsx";

const AdminList = () => {
  const { adminData, updateApi } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [editAdmin, setEditAdmin] = useState(null); // store the selected admin object
  const [loading, setLoading] = useState(false);

  // 🔹 Format timestamps nicely
  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 🔹 Filter admins
  const filteredAdmins = adminData.filter(
    (admin) =>
      admin.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone?.includes(searchTerm) ||
      admin.adminID?.includes(searchTerm.toUpperCase())
  );

  // 🔹 Delete admin handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await axios.delete(
        `https://fabribuzz.onrender.com/api/user/admin/delete/${id}`
      );
      await updateApi(); // Refresh admin list after delete
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded">
      {editAdmin ? (
        // ✅ Render edit form for selected admin
        <UpdateAdmin user={editAdmin} back={() => setEditAdmin(null)} />
      ) : (
        <>
          {/* 🔍 Search and Title */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-3">
            <h2 className="text-xl font-semibold text-gray-700">Admin List</h2>

            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="username || phone || ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* 🧾 Admin Table */}
          <div className="overflow-x-auto max-h-[80vh]">
            <table className="w-full border border-gray-200 text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-200 text-gray-700 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 border-b">S/N</th>
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
                  filteredAdmins.map((admin, index) => (
                    <tr
                      key={admin.adminID}
                      className="hover:bg-gray-100 transition duration-150"
                    >
                      <td className="py-3 px-4 border-b">{index + 1}</td>
                      <td className="py-3 px-4 border-b">{admin.adminID}</td>
                      <td className="py-3 px-4 border-b">{admin.fullName}</td>
                      <td className="py-3 px-4 border-b">{admin.userName}</td>
                      <td className="py-3 px-4 border-b">{admin.email}</td>
                      <td className="py-3 px-4 border-b">{admin.phone}</td>
                      <td className="py-3 px-4 border-b">{admin.role}</td>

                      <td
                        className={`py-3 px-4 border-b font-medium ${
                          admin.status ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {admin.status ? "Active" : "Suspended"}
                      </td>

                      <td className="py-3 px-4 border-b">
                        {formatDate(admin.createdAt)}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formatDate(admin.lastLogin)}
                      </td>

                      <td className="py-1 px-4 border-b text-center space-x-3">
                        <button
                          onClick={() => setEditAdmin(admin)} // open update form
                          className="text-yellow-500 hover:text-yellow-700 text-xl"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          // onClick={() => handleDelete(admin.adminID)}
                          className="text-red-500 hover:text-red-700 text-xl"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No matching admins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="text-center mt-3 text-blue-600">Updating...</div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminList;
