import React, { useState } from "react";
import axios from "axios";
import "./AddFood.css";

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // ✅ handles file OR text
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const homemaker = JSON.parse(localStorage.getItem("homeMaker")); // ✅ stored at login

    if (!homemaker?._id) {
      alert("❌ Homemaker not logged in");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image);
    data.append("homeMakerId", homemaker._id); // ✅ required by DB model

    try {
      const response = await axios.post(
        "https://food-del-backend-eg8o.onrender.com/api/food/add",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert("✅ Food Added Successfully!");

        // Reset form after successful upload
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: null,
        });

        document.querySelector('input[type="file"]').value = "";
      } else {
        alert("❌ Failed to add food");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="add-food-container">
      <h2>Add New Food</h2>

      <form className="add-food-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non Veg</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
