import './Filter.css'
import React, { useState } from 'react';

const FilterProduct = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [products, setProducts] = useState([]);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleProductCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };
  const handleSearchClick = () => {
    fetch(`http://localhost:5000/products/filterby?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${productCategory}`,{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <div className="filter-container">
    <label className="filter-label">
      Min Price:
      <input
        className="filter-input"
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
    </label>
    <label className="filter-label">
      Max Price:
      <input
        className="filter-input"
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
    </label>
    <label className="filter-label">
      Product Category:
      <select
        className="filter-select"
        value={productCategory}
        onChange={handleProductCategoryChange}
      >
        <option value="">Select a category</option>
        <option value="mobile">mobile</option>
        <option value="keyboard">keyboard</option>
        <option value="shirt">shirt</option>
        <option value="t-shirt">T-shirt</option>
        <option value="mouse">Mouse</option>
      </select>
    </label>
    <button className="filter-button" onClick={handleSearchClick}>Search</button>
    <ul className="product-list">
  
      {products.map((item) => (
        <div key={item.productId} className="product-cart">
          <div className="image">
            <img src={item.image} alt='img'></img>
          </div>
          <div className="cart-detail">
            <h1>{item.name}</h1>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <h3>Total Price: {item.price * item.quantity}</h3>
          </div>
        </div>
      ))}
    </ul>
  </div>
  
  );
};

export default FilterProduct;
