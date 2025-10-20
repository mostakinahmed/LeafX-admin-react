import { FiBell, FiUser } from "react-icons/fi";
import { AuthContext } from "../Context Api/AuthContext";
import { useContext, useState } from "react";
import { img } from "framer-motion/client";

export default function Navbar({ pageTitle }) {
  const { user, logout } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);

  const adminInfo = {
    name: "Mostakin",
    role: "Administrator",
    email: "admin@example.com",
  };

  const toggleAdminPopup = () => {
    setShowPopup((prev) => !prev);
  };

  console.log(user);
  
  return (
    <div className="flex justify-between items-center bg-white px-4 py-1 shadow-md rounded mb-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold line-clamp-1">{pageTitle}</h1>

      {/* Right side: Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className=" relative p-2 rounded hover:bg-gray-100">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleAdminPopup}
        >
          <span className=" hidden lg:flex  -bold text-lg hover:text-blue-600">Admin</span>
          <img
            className="w-10 h-10 lg:w-13 lg:h-13 rounded-full border-2"
            src={
              user.images
                ? user.images
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
            }
            alt="User"
          />
        </div>
      </div>

      {/* Admin Popup */}
      {showPopup && user && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blurred white background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

          {/* Popup content */}
          <div className="relative bg-white rounded-xl shadow-xl lg:w-96 w-85 max-w-full text-left z-10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-600 text-white p-4">
              <h2 className="text-lg font-semibold">Admin Profile</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white font-bold text-3xl hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Avatar */}
            <div className="flex justify-center -mt-12">
              <img
                src={
                  user.images ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                }
                alt={user.fullName}
                className="w-24 h-26 rounded-full border-4 border-white shadow-md"
              />
            </div>

            {/* Profile info */}
            <div className="p-6">
              <table className="w-full text-gray-700">
                <tbody>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Full Name</td>
                    <td className="py-2">: {user.fullName}</td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Username</td>
                    <td className="py-2">: @{user.userName}</td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">ID</td>
                    <td className="py-2">: {user.uID}</td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Role</td>
                    <td className="py-2 text-green-600 text-md font-bold">
                      : {user.admin ? "Admin" : "User"}
                    </td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Email</td>
                    <td className="py-2">: {user.email}</td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Phone</td>
                    <td className="py-2">: {user.phone}</td>
                  </tr>

                  <tr className="border-b py-2">
                    <td className="font-medium py-2">Created At</td>
                    <td className="py-2">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Close Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => logout()}
                  className="bg-red-500 text-white text-lg px-6 py-2 rounded-full hover:bg-red-600 transition-all"
                >
                  Logout
                </button>

                {/* <button
                  onClick={() => setShowPopup(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all"
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
