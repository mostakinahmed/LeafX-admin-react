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

      {/* extra code here */}
      
    </div>
  );
}
