import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import axios from "axios";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/Context Api/ApiContext";

const AddCategory = () => {
  const navigate = useNavigate();

  const { updateApi } = useContext(DataContext);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [success, setSuccess] = useState(false);

  const [category, setCategory] = useState({
    catID: "",
    catName: "",
    specifications: [""],
  });

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  // Handle specification field change
  const handleSpecChange = (index, value) => {
    const newSpecs = [...category.specifications];
    newSpecs[index] = value;
    setCategory({ ...category, specifications: newSpecs });
  };

  // Add specification field
  const addSpecification = () => {
    setCategory({
      ...category,
      specifications: [...category.specifications, ""],
    });
  };

  // Remove specification field
  const removeSpecification = (index) => {
    const newSpecs = category.specifications.filter((_, i) => i !== index);
    setCategory({ ...category, specifications: newSpecs });
  };

  // Reset form fields
  const resetForm = () => {
    setCategory({
      catID: "",
      catName: "",
      specifications: [""],
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    setSuccess(false);

    try {
      await axios.post("https://fabribuzz.onrender.com/api/category", category);
      setSuccess(true);
      updateApi();
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to save category!");
      setSubmitLoader(false);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto mt-10">
      <Card className="p-6 shadow-md rounded relative z-10">
        <CardContent>
          <h2 className="text-2xl p-1 bg-gray-200 text-center font-semibold mb-4 text-gray-800 rounded">
            Add New Category
          </h2>

          {/* Overlay Loader or Success */}
          {submitLoader && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-20 rounded-lg">
              {!success ? (
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center animate-fadeIn">
                  <FaSpinner className="text-blue-500 text-6xl animate-spin mb-4" />
                  <p className="text-gray-700 font-semibold text-lg">
                    Please wait...
                  </p>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center animate-fadeIn">
                  <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                  <p className="text-gray-700 font-semibold text-lg mb-4">
                    Category saved successfully!
                  </p>
                  <div className="flex w-full gap-2">
                    <Button
                      className="flex-1 bg-green-500 text-white hover:bg-green-600 transition"
                      onClick={() => {
                        resetForm();
                        setSubmitLoader(false);
                        setSuccess(false);
                        navigate("/category");
                      }}
                    >
                      OK
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category ID */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category ID
              </label>
              <Input
                type="text"
                name="catID"
                value={category.catID}
                onChange={handleChange}
                placeholder="e.g., C001"
                required
                className="rounded"
              />
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category Name
              </label>
              <Input
                type="text"
                name="catName"
                value={category.catName}
                onChange={handleChange}
                placeholder="e.g., Mobile"
                required
                className="rounded"
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Specifications
              </label>
              {category.specifications.map((spec, index) => (
                <div key={index} className="flex items-center mb-2 gap-2">
                  <Input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                    placeholder={`Specification ${index + 1}`}
                    required
                    className="rounded"
                  />
                  {category.specifications.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSpecification(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addSpecification}
                variant="outline"
                className="mt-2 flex bg-gray-200 rounded hover:bg-gray-300 items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Specification
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 text-md rounded mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
