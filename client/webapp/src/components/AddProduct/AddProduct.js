import "./AddProduct.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/add/product", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      });

      const data = await response.json();
      console.log(data);
      // if (data.status === true) {
        navigate("/");
    // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="full_body">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label_name">Name</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="text" value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
          />
        </div>
        <div>
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
