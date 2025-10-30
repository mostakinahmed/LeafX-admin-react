import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar";
import { DataContext } from "@/Context Api/ApiContext";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { set } from "date-fns";

const AddProduct = () => {
  const { updateApi } = useContext(DataContext);
  const navigate = useNavigate();
  const { categoryData, loading } = useContext(DataContext);

  const [specification, setSpecification] = useState([]); // spec names
  const [specValues, setSpecValues] = useState({}); // { specName: [{key:'', value:''}, ...] }
  const [finalData, setFinalData] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false); // new success state
  const [formVisible, setFormVisible] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    price: "",
    stock: "",
    images: "",
    description: "",
    category: "",
  });

  // Update specifications when category changes
  useEffect(() => {
    const selectedCat = formData.category;
    const category = categoryData.find((cat) => cat.catID === selectedCat);
    if (category) {
      setSpecification(category.specifications);
      const newSpecs = {};
      category.specifications.forEach((spec) => {
        newSpecs[spec] = [{ key: "", value: "" }]; // default one row
      });
      setSpecValues(newSpecs);
    } else {
      setSpecification([]);
      setSpecValues({});
    }
  }, [formData.category, categoryData]);

  // Handle general input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle key/value change for a spec row
  const handleSpecChange = (spec, index, field, value) => {
    setSpecValues((prev) => {
      const updated = { ...prev };
      updated[spec][index][field] = value;
      return updated;
    });
  };

  // Add a new key-value row for a spec
  const addSpecRow = (spec) => {
    setSpecValues((prev) => {
      const updated = { ...prev };
      updated[spec].push({ key: "", value: "" });
      return updated;
    });
  };

  // Remove a key-value row for a spec
  const removeSpecRow = (spec, index) => {
    setSpecValues((prev) => {
      const updated = { ...prev };
      updated[spec] = updated[spec].filter((_, i) => i !== index);
      return updated;
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    setSubmitLoader(true);

    // Clean up specValues → remove rows with empty key/value
    const cleanedSpecs = {};
    Object.keys(specValues).forEach((spec) => {
      const validRows = specValues[spec].filter(
        (row) => row.key.trim() !== "" && row.value.trim() !== ""
      );

      // Only include this spec if it has at least one valid row
      if (validRows.length > 0) {
        cleanedSpecs[spec] = validRows;
      }
    });

    const finalData = {
      ...formData,
      specifications: cleanedSpecs,
    };

    setFinalData(finalData);
    saveData(finalData); // pass directly to saveData
  };

  //console.log(finalData);
  const saveData = async (data) => {
    //data sent to backend
    const res = await axios
      .post("https://fabribuzz.onrender.com/api/product", data)
      .then((response) => {
        setSpinner(false);
        setSuccess(true);
        updateApi();
        console.log("Product saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving product:", error);
      });
    // Here you can implement the logic to save finalData to your backend or database
  };

  //reset form
  const resetForm = () => {
    setFormData({
      name: "",
      brandName: "",
      price: "",
      stock: "",
      images: "",
      description: "",
      category: "",
    });
    setSpecification([]);
    setSpecValues({});
    setFinalData([]);
  };

  return (
    <div>
      <Navbar pageTitle="Add New Product" />
      <div className="mx-auto flex flex-col md:flex-row min-h-screen">
        {/* ✅ Make this parent relative so the loader stays inside */}
        <div className="relative w-full mx-auto bg-white shadow">
          {/* ✅ Loader overlay */}
          {submitLoader && (
            <div className="absolute inset-0  flex items-center min-h-screen justify-center bg-white/30 backdrop-blur-sm z-20">
              {!success ? (
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center animate-fadeIn">
                  <FaSpinner className="text-blue-500 text-6xl animate-spin mb-4" />
                  <p className="text-gray-700 font-semibold text-lg">
                    Please wait...
                  </p>
                </div>
              ) : (
                <div className="bg-white p-8  rounded-lg shadow-lg flex flex-col items-center animate-fadeIn">
                  <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                  <p className="text-gray-700 font-semibold text-lg mb-4">
                    Product saved successfully!
                  </p>
                  <div className="flex w-full gap-2">
                    <button
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => {
                        setSuccess(false);
                        setSubmitLoader(false);
                        resetForm();
                        navigate(-1);
                      }}
                    >
                      Back
                    </button>
                    <button
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      onClick={() => {
                        resetForm();
                        setSuccess(false);
                        setSubmitLoader(false);
                        navigate("/products/add-product");
                      }}
                    >
                      Add more
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ✅ The rest of your form */}
          <form onSubmit={handleSubmit} className="">
            <div className="gap-3 lg:flex rounded">
              {/* Left Section */}
              <div className="rounded lg:w-[800px] max-w-full h-auto">
                <h2 className="text-lg p-2 mb-2 rounded-t bg-blue-600 text-white sm:text-xl font-semibold">
                  General Info
                </h2>
                <div className="px-2 space-y-4">
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
                      className="w-full text-center text-lg border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option className="bg-gray-300" value="">
                        -- Select Category --
                      </option>
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

              {/* Right Section: Specifications */}
              <div className="rounded w-full mt-3 lg:mt-0">
                <h2 className="text-lg sm:text-xl text-white py-2 px-2 rounded-t bg-blue-600 font-semibold">
                  Specification
                </h2>

                {specification.length > 0 ? (
                  <div className="py-2 rounded-b space-y-3">
                    {specification.map((spec, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex justify-between bg-gray-200 pl-2 mx-2 lg:mr-2">
                          <label className="font-medium text-gray-700">
                            {spec}
                          </label>
                          <button
                            type="button"
                            onClick={() => addSpecRow(spec)}
                            className="text-sm bg-gray-400 text-black px-2 py-1 w-fit hover:bg-blue-400 transition"
                          >
                            + Add more
                          </button>
                        </div>

                        {specValues[spec]?.map((row, i) => (
                          <div
                            key={i}
                            className="lg:flex gap-3 mx-2 lg:mr-2 items-center"
                          >
                            <input
                              type="text"
                              value={row.key}
                              onChange={(e) =>
                                handleSpecChange(spec, i, "key", e.target.value)
                              }
                              placeholder="Key"
                              className="px-2 w-full py-1 border rounded focus:ring-2 focus:ring-blue-500 flex-1"
                            />
                            <input
                              type="text"
                              value={row.value}
                              onChange={(e) =>
                                handleSpecChange(
                                  spec,
                                  i,
                                  "value",
                                  e.target.value
                                )
                              }
                              placeholder="Value"
                              className="px-2 py-1 mt-1 lg:mt-0 w-full border rounded focus:ring-2 focus:ring-blue-500 flex-1"
                            />
                            {specValues[spec].length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSpecRow(spec, i)}
                                className="text-red-600 font-bold px-2 py-1 rounded hover:bg-red-100"
                              >
                                −
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72 bg-yellow-50 border border-yellow-300 rounded-b">
                    <p className="text-yellow-700 font-semibold text-xl text-center">
                      ⚠ Please select category ⚠
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="text-right flex lg:justify-end px-2 mb-3 mt-3 lg:mt-0">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-2 py-1 mr-3 lg:w-40 w-full font-medium text-md text-white bg-red-600 hover:bg-red-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 w-full lg:w-40 font-medium text-md text-white bg-blue-600 hover:bg-blue-800 rounded"
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
