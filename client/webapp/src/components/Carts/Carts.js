import './Carts.css'
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/carts",{
                  headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                  },
                })
        const data = await response.json();
        console.log(data)
        const { items, totalPrice } = data.data;
        setItems(items);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const buyProduct= async(productId,quantity,price,image)=>{

  };
  const deleteCart= async(cartId)=>{

  };

  return (
    <div>
      <div>
        <h1>Your Cart</h1>
      </div>
      <div className="product-list">
        {items.map((item) => (
          <div key={item.productId} className="product-cart">
            <div className="image">
              <img src={item.image} alt={item.name}></img>
            </div>
            <div className="cart-detail">
              <h1>{item.name}</h1>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <h3>Total Price: {item.price * item.quantity}</h3>
              <button
                  onClick={() => buyProduct(item.productId, item.quantity,item.price,item.image)}
                  className="add-cart-link " 
                >
                  Buy Now
                </button>
                <button className="add-cart-link " onClick={()=>deleteCart(item._id)}>Remove</button>
            </div>
          </div>
        ))}
        <div>
        <h2>Total Price: {totalPrice}</h2>
      </div>
      </div>
    
    
    </div>
  );
};

export default Cart;


