import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context Api/ApiContext";

export default function Products() {
  const { categoryData, productData, loading } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchId, setSearchId] = useState("");
  const [catList, setCatList] = useState([]);

  const productsPerPage = 10;
  const navigate = useNavigate();
  let sn = 1;
  //for filter
  useEffect(() => {
    if (productData.length && categoryData.length) {
      const formattedData = productData.map((element) => {
        const category = categoryData.find((c) => c.catID === element.category);
        if (category) {
          return element.category + " - " + category.catName;
        } else {
          return element.category; // fallback if no category found
        }
      });

      const uniqueCatList = [...new Set(formattedData)];
      setCatList(uniqueCatList); //  only runs once per data change
    }
  }, [productData, categoryData]); // dependencies

  //  Handle both object or array types from backend
  useEffect(() => {
    if (productData) {
      const formatted = Array.isArray(productData) ? productData : [];
      setProducts(formatted);
    }
  }, [productData]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">
          Loading products...
        </p>
      </div>
    );

  // ✅ Filtering + Searching
  const filteredProducts = products
    .filter((p) => {
      if (categoryFilter === "All") return true;

      // extract the ID from categoryFilter
      const filterID = categoryFilter.split(" - ")[0];
      return p.category === filterID;
    })
    .filter((p) =>
      searchId ? p.pID?.toString().includes(searchId.toString()) : true
    );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // // ✅ Handle delete locally (optional)
  // const handleDeleteProduct = (id) => {
  //   setProducts(products.filter((p) => p._id !== id));
  // };

  return (
    <div className="pb-24">
      <Navbar pageTitle="Product Management" />

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-4 bg-white shadow rounded">
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        >
          {/* <option value="All">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option> */}
          <option value="All">All Categories</option>
          {catList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => {
              const ID = e.target.value;
              const upperCaseID = ID.toUpperCase(e);

              setSearchId(upperCaseID);
              setCurrentPage(1);
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
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Brand Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product._id || index} className="text-center border-b">
                  <td className="px-4 py-2">{sn++}</td>
                  <td className="px-4 py-2">{product.pID}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.brandName}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">
                    {product.images[0] ? (
                      <img
                        src={product.images}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>

                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
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
      )}
    </div>
  );
}
