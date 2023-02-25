import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  let data = localStorage.getItem('user')
  data = JSON.parse(data)
  const navigate = useNavigate()

  const logout=()=>{
      localStorage.clear()
      navigate('/signup')
  }
  return (


    <div className="navbar-container">
    <Link to='/'>  <img className='logo' src='https://cdn-icons-png.flaticon.com/512/669/669736.png?w=740&t=st=1677307885~exp=1677308485~hmac=9b339e33b6defb246296cf99b77e13d6c7da98d33da4db8f2a6e7588455ea14d' alt='logo' /> </Link>
      <p className='titleStyle'>Shopkeeper.Com</p>
 {data ?   
    <ul className='nav-ul'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add/product'>Add Product</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
        <li> <Link onClick={logout} to='/signup'>🔴Logout  🟢{data}</Link> </li>
       
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