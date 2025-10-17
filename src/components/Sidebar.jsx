import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiArchive,
  FiShoppingCart,
  FiUsers,
  FiFileText,
  FiTrendingUp, // new icon for Sales
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Products", path: "/products", icon: <FiBox /> },
    { name: "Stock", path: "/stock", icon: <FiArchive /> },
    { name: "Orders", path: "/orders", icon: <FiShoppingCart /> },
    { name: "Sales", path: "/sales", icon: <FiTrendingUp /> }, 
    { name: "Users", path: "/users", icon: <FiUsers /> },
    { name: "Receipt", path: "/receipt", icon: <FiFileText /> },
  ];

  return (
    <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        {links.map((link) => {
          const isActive =
            location.pathname === link.path ||
            location.pathname.startsWith(link.path + "/");
          return (
            <Link
              key={link.name}
              to={link.path}
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
  );
}
