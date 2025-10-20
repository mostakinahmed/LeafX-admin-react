import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiArchive,
  FiShoppingCart,
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiGrid,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Products", path: "/products", icon: <FiBox /> },
    { name: "Category", path: "/category", icon: <FiGrid /> },
    { name: "Stock", path: "/stock", icon: <FiArchive /> },
    { name: "Orders", path: "/orders", icon: <FiShoppingCart /> },
    { name: "Sales", path: "/sales", icon: <FiTrendingUp /> },
    { name: "Users", path: "/users", icon: <FiUsers /> },
    { name: "Receipt", path: "/receipt", icon: <FiFileText /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden  mt-3 bg-white p-2 shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-blue-600"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

         <nav className="flex flex-col gap-3 mt-10">
          {links.map((link) => {
            const isActive =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // auto close on mobile click
                className={`flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-600 transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
              </Link>
            );
          })}
        </nav>
        {/* <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1> */}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-50 bg-white shadow-lg p-4 flex flex-col transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold mb-6 text-blue-600 hidden sm:block"
        >
          Admin Panel
        </button>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // auto close on mobile click
                className={`flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-600 transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 sm:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
