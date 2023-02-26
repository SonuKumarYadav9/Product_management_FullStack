import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./Home.css";
// import coverImg from "../../photoes/sale 50%.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);


  // Adding to cart in home page



  const addToCart = async (productId, quantity,image) => {
    // const formData = new FormData();
    // formData.append("productId", productId);
    // formData.append("qauntity", quantity);
    // formData.append("image", image);
    try {
      const response = await fetch(`http://localhost:5000/add/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, productId, image }),
      });

      const data = await response.json();
      console.log(data);
      if (!data.ok) {
       alert(data.msg);
      } else {
       //seeting the name and token to localStorage
        localStorage.setItem("quantity", data.quantity);
        alert(data.msg);
        console.log(data)
      }
      
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  console.log(products);

  return (
    <div>
      <img
        className="cover-image"
        src="https://img.freepik.com/free-vector/flat-shopping-center-social-media-cover-template_23-2149329461.jpg?w=996&t=st=1677409657~exp=1677410257~hmac=056f787d334cd12ec9309889fe45c9597d8cb46220b669bed13ebba0712e0d02"
        alt="cover"
      ></img>
      <div className="product-list-container">
        <div className="product-list-header">
          <h2>Product List</h2>
          {/* <Link to="/add/product" className="add-product-link">
          Add Product
        </Link> */}
        </div>
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p> {product.category}</p>

                {/* Quantity MANAGER */}
                <div>
                  <button type="button" onClick={handleDecreaseQuantity}>
                    ➖
                  </button>
                  {quantity}
                  <button type="button" onClick={handleIncreaseQuantity}>
                    ➕
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product._id, quantity,product.image)}
                  className="add-product-link"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
