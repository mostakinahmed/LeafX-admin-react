import { FiBell, FiUser } from "react-icons/fi";

export default function Navbar({ pageTitle }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded mb-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      {/* Right side: Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="relative p-2 rounded hover:bg-gray-100">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <FiUser size={20} />
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
}
