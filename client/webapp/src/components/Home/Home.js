import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  // const nav=useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  //for general search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const addToCart = async (productId, quantity, image) => {
    try {
      const response = await fetch(`http://localhost:5000/add/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, productId, image }),
      });

      const data = await response.json();
      if (!data.ok) {
        alert(data.msg);
      } else {
        localStorage.setItem("quantity", data.quantity);
        alert(data.msg);
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


  return (
    <div>
    <img 
      className="product-cover-image"
      src="https://img.freepik.com/free-vector/flat-shopping-center-social-media-cover-template_23-2149329461.jpg?w=996&t=st=1677409657~exp=1677410257~hmac=056f787d334cd12ec9309889fe45c9597d8cb46220b669bed13ebba0712e0d02"
      alt="cover"
    ></img>
    <div className="product-list-container">
      <div className="product-list-header">
        <h2 className="product-list-title">Product List</h2>
        <input
          className="product-searchbar"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
        <Link className="product-filter-link" to={"/filter"}>
          Filter Products
        </Link>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-category">{product.category}</p>
  
              <div className="product-quantity">
                <button
                  className="quantity-button"
                  type="button"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                {quantity}
                <button
                  className="quantity-button"
                  type="button"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  addToCart(product._id, quantity, product.image)
                }
                className="add-product-button"
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
