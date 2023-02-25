import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Product List</h2>
        <Link to="/add/product" className="add-product-link">
          Add Product
        </Link>
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
              <p>Category: {product.category}</p>
              <Link to={`/edit/${product._id}`} className="add-product-link">
              {/* <Link to={`/edit/${product._id}`} className="edit-product-link"> */}
                Add To Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
