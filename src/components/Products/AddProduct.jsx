import { useState } from "react";
import Navbar from "../Navbar";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!product.name || !product.category || !product.price || !product.stock) return;
    // onAdd({
    //   ...product,
    //   price: Number(product.price),
    //   stock: Number(product.stock),
    // });
    // setProduct({ name: "", category: "", price: "", stock: "" });
  };

  return (
    <div>
      <Navbar pageTitle="Add Product" />
      <div className="p-4 bg-white rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Genaral Info</h2>
        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 border rounded flex-1"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="p-2 border rounded flex-1"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 border rounded flex-1"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            className="p-2 border rounded flex-1"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
