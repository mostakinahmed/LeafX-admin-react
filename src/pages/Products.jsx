import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop Pro",
      category: "Electronics",
      price: 1200,
      stock: 15,
    },
    {
      id: 2,
      name: "Smartphone X",
      category: "Electronics",
      price: 800,
      stock: 30,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 150,
      stock: 50,
    },
    {
      id: 4,
      name: "Jeans Classic",
      category: "Clothing",
      price: 60,
      stock: 40,
    },
    {
      id: 5,
      name: "T-Shirt Casual",
      category: "Clothing",
      price: 25,
      stock: 100,
    },
    { id: 6, name: "Sneakers Run", category: "Clothing", price: 80, stock: 25 },
    {
      id: 7,
      name: "Coffee Maker",
      category: "Home Appliances",
      price: 90,
      stock: 12,
    },
    {
      id: 8,
      name: "Blender Pro",
      category: "Home Appliances",
      price: 120,
      stock: 8,
    },
    {
      id: 9,
      name: 'LED Monitor 24"',
      category: "Electronics",
      price: 200,
      stock: 20,
    },
    {
      id: 10,
      name: "Office Chair",
      category: "Furniture",
      price: 150,
      stock: 5,
    },
    {
      id: 11,
      name: "Dining Table Set",
      category: "Furniture",
      price: 400,
      stock: 2,
    },
    {
      id: 12,
      name: "Dress Elegant",
      category: "Clothing",
      price: 120,
      stock: 18,
    },
    {
      id: 13,
      name: "Air Conditioner",
      category: "Home Appliances",
      price: 600,
      stock: 4,
    },
    {
      id: 14,
      name: "Smartwatch",
      category: "Electronics",
      price: 220,
      stock: 35,
    },
    { id: 15, name: "Bookshelf", category: "Furniture", price: 180, stock: 10 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchId, setSearchId] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // Filtered and searched products
  const filteredProducts = products
    .filter((p) =>
      categoryFilter === "All" ? true : p.category === categoryFilter
    )
    .filter((p) => (searchId ? p.id.toString() === searchId : true));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle Add Product
  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.stock
    )
      return;

    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    setProducts([
      ...products,
      {
        id: newId,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      },
    ]);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
  };

  // Handle Delete Product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <Navbar pageTitle="Product Management" />

      {/* Add Product Form */}
      {/* <div className="p-4 bg-white rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 border rounded flex-1"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            className="p-2 border rounded flex-1"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 border rounded flex-1"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            className="p-2 border rounded flex-1"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div> */}

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="p-2 border rounded"
        >
          <option value="All">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            className="p-2 border rounded"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
            onClick={() => navigate("/products/add-product")}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="text-center border-b">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 fixed bottom-0 left-0 w-full bg-white p-4 shadow-inner">
        <button
          className="px-3 py-1 border rounded hover:bg-gray-200"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded hover:bg-blue-100 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded hover:bg-gray-200"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
