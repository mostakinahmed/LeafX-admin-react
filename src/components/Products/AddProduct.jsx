import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import { DataContext } from "@/Context Api/ApiContext";

const AddProduct = () => {
  const { categoryData, loading } = useContext(DataContext);

  const [specification, setSpecification] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    price: "",
    stock: "",
    images: "",
    description: "",
    category: "",
  });

  // console.log(formData.category);
  const updateCatSpec = () => {
    const selectedCat = formData.category;

    const category = categoryData.find((cat) => cat.catID === selectedCat);
    if (category) {
      setSpecification(category.specifications);
    } else {
      setSpecification("");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 Product Data Submitted:", formData);
  };

  return (
    <div>
      <Navbar pageTitle="product" />
      <div className="mx-auto flex flex-col md:flex-row min-h-screen">
        {/* Product Form */}
        <div className="w-full mx-auto bg-white shadow">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="gap-3 lg:flex rounded space-y-6">
              {/* 1st Section */}
              <div className="rounded lg:w-[800px] max-w-full h-auto">
                <h2 className="text-lg p-2 mb-2 rounded-t bg-blue-600 text-white sm:text-xl font-semibold">
                  General Info
                </h2>

                <div className="pl-2 space-y-4">
                  {/* Reusable Input Field */}
                  {[
                    { label: "Product Name", name: "name", type: "text" },
                    { label: "Brand Name", name: "brandName", type: "text" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Stock Quantity", name: "stock", type: "number" },
                    { label: "Product Image", name: "images", type: "text" },
                    { label: "Description", name: "description", type: "text" },
                  ].map((input, idx) => (
                    <div key={idx} className="flex flex-col">
                      <label className="mb-1 font-medium text-gray-700">
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleChange}
                        placeholder={`Enter ${input.label.toLowerCase()}`}
                        required
                        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}

                  {/* Category Dropdown */}
                  <div className="flex flex-col bg-gray-200 md:col-span-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      onClick={updateCatSpec}
                      className="w-full text-center text-lg border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {!loading &&
                        categoryData?.map((cat, idx) => (
                          <option key={idx} value={cat.catID}>
                            {cat.catID + " - " + cat.catName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2nd Section */}
              <div className="min-h-[250px] rounded w-full">
                <h2 className="text-lg sm:text-xl text-white py-2 px-2 rounded-t bg-blue-600 font-semibold">
                  Specification
                </h2>

                {/* Centered Category Notice */}
                {specification ? (
                  specification.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col p-2 border-b last:border-0"
                    >
                      <label className="mb-1 font-medium text-gray-700">
                        {spec}
                      </label>
                      <input
                        type="text"
                        name={spec}
                        placeholder={`Enter ${spec.toLowerCase()}`}
                        required
                        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-40 bg-yellow-50 border border-yellow-300 rounded-b">
                    <p className="text-yellow-700 font-semibold text-xl text-center">
                      ⚠ Please select category ⚠
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-right mr-3 mb-3">
              <button
                type="submit"
                className="relative px-6 py-2 font-medium text-xl text-white bg-blue-600 hover:bg-blue-800 rounded"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
