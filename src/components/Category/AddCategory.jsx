import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

const AddCategory = () => {
  const [category, setCategory] = useState({
    catID: "",
    catName: "",
    specifications: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSpecChange = (index, value) => {
    const newSpecs = [...category.specifications];
    newSpecs[index] = value;
    setCategory({ ...category, specifications: newSpecs });
  };

  const addSpecification = () => {
    setCategory({
      ...category,
      specifications: [...category.specifications, ""],
    });
  };

  const removeSpecification = (index) => {
    const newSpecs = category.specifications.filter((_, i) => i !== index);
    setCategory({ ...category, specifications: newSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Data:", category);
    alert("Category added successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card className="lg:p-6 shadow-md rounded">
        <CardContent>
          <h2 className="text-2xl p-1 bg-gray-200 text-center font-semibold mb-4 text-gray-800">
            Add New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-2 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Specification
              </Button>
            </div>

            <Button type="submit" className="w-full h-10 text-md rounded mt-4 bg-blue-600 hover:bg-blue-700 text-white hover:text-white">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
