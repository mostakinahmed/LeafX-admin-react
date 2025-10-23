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
  FiUser,
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
    { name: "Accounts", path: "/accounts", icon: <FiUser /> },
    { name: "Users", path: "/users", icon: <FiUsers /> },
    { name: "Receipt", path: "/receipt", icon: <FiFileText /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden bg-gray-800 text-white p-2 shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl mt-3 text-blue-600"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="flex flex-col gap-3 mt-6">
          {links.map((link) => {
            const isActive =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // auto close on mobile click
                className={`flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-600 transition ${
                  isActive ? "bg-white text-blue-600 font-semibold" : ""
                }`}
              >
                {link.icon}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-50 bg-gray-900 text-white shadow-lg p-4 flex flex-col transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex">
          <img className="h-10 w-10" src="/logo.png" alt="Logo" />
          <button
            onClick={() => navigate("/")}
            className=" text-xl mt-4 font-bold text-blue-600 hidden sm:block"
          >
            Admin Panel
          </button>
          <h1 className=" sm:hidden text-xl font-bold text-blue-600">
            Admin Panel
          </h1>
        </div>

        <nav className="flex flex-col lg:gap-2 mt-9 lg:mt-12 gap-1">
          {links.map((link) => {
            const isActive =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // auto close on mobile click
                className={`flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-600 transition ${
                  isActive ? "bg-white text-blue-600 font-semibold" : ""
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
