import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    inventory: "",
    description: "",
    available: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://your-api-endpoint/products", product);
      if (response.status === 201) {
        setMessage("Product added successfully!");
        setProduct({
          id: "",
          name: "",
          price: "",
          inventory: "",
          description: "",
          available: false,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Product ID:
          </label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Inventory:
          </label>
          <input
            type="number"
            name="inventory"
            value={product.inventory}
            onChange={handleChange}
            required
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-start space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Available:
          </label>
          <input
            type="checkbox"
            name="available"
            checked={product.available}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;