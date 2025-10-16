import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Receipt from "./pages/Receipt";
import Category from "./pages/Category";
import  AddProduct  from "./components/Products/AddProduct";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* //All product route */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add-product" element={<AddProduct />} />

            <Route path="/category" element={<Category />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/receipt" element={<Receipt />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
