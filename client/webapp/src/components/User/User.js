import React, { useEffect, useState } from "react";
import './User.css'
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        const data = await response.json();
        console.log(data)
        const { name, image,email } = data.data;
        setUser([{ name, image,email }]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="product-list">
        <img src={user[0]?.image} alt={user[0]?.name} />
        {user.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.email}</p>
              <Link className="btn" to={"/carts"}> Your Cart</Link> 
           <Link  className="btn"  to={"/purchase"}> Your Purchase</Link>
            </div>
          </div>
        ))}
     
      </div>
    </div>
  );
};

export default User;
