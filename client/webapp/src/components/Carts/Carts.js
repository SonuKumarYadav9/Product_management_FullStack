import "./Carts.css";
import React, { useState, useEffect } from "react";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/carts", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        const data = await response.json();
        console.log(data);
  
        // Check if the cart has been purchased
        if (!data.purchased===true) {
          const { items, totalPrice } = data.data;
          setItems(items);
          setTotalPrice(totalPrice);
       
        }
      } catch (error) {
        console.error(error);
      }
       
    };
    fetchData();
  }, []);
  

  const buyProduct = async (productId, quantity, price, image) => {
    try {
      // Implement the buyProduct functionality here
      // After the purchase is successful, you can remove the item from the cart
      await fetch("http://localhost:5000/buy-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
          price,
          image,
        }),
      });

      // Remove the item from the cart
      const newItems = items.filter((item) => item.productId !== productId);
      setItems(newItems);

      // Update the total price
      setTotalPrice(totalPrice - price * quantity);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCart = async (cartId) => {
    try {

      let id = items._id
      console.log(id)
  
      await fetch(`http://localhost:5000/carts/${items._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
  
      // Remove the item from the cart
      const newItems = items.filter((item) => item._id !==items._id);
      setItems(newItems);
  
      // Update the total price
      const deletedCartItem = items.find((item) => item._id === items._id);
      setTotalPrice(
        totalPrice - deletedCartItem.price * deletedCartItem.quantity
      );
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(deleteCart())

  return (
    <div>
      <div>
        <h1>Your Cart</h1>
      </div>
      <div className="product-list">
        {items.map((item) => (
          <div key={item.productId} className="product-cart">
            <div className="image">
              <img src={item.image} alt='img'></img>
            </div>
            <div className="cart-detail">
              <h1>{item.name}</h1>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <h3>Total Price: {item.price * item.quantity}</h3>
              <button
                onClick={() =>
                  buyProduct(
                    item.productId,
                    item.quantity,
                    item.price,
                    item.image
                  )
                }
                className="add-cart-link"
              >
                Buy Now
              </button>
              <button
                className="add-cart-link"
                onClick={() => deleteCart(item._id)}
              >
                Remove
              </button>
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
