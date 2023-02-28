import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  let data = localStorage.getItem('user')
  let quantity = localStorage.getItem("quantity")
  data = JSON.parse(data)
  quantity = JSON.parse(quantity)
  const navigate = useNavigate()

  const logout=()=>{
      localStorage.clear()
      navigate('/register')
  }
  return (


    <div className="navbar-container">
    <Link to='/'>  <img className='logo' src='https://e7.pngegg.com/pngimages/425/225/png-clipart-shopee-indonesia-online-shopping-e-commerce-others-miscellaneous-text-thumbnail.png' alt='logo' /> </Link>
      <p className='titleStyle'>SlipKart</p>
 {data ?   
    <ul className='nav-ul'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add/product'>Add Product</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/carts'>Cart {quantity}</Link></li>
        <li> <Link onClick={logout} to='/register'>🔴Logout  🟢{data}</Link> </li>
       
      </ul>
      : 
      <ul className='nav-ul' >
      <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
      }
    </div>
  );
};

export default Navbar;