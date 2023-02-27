import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AddProduct from "./components/AddProduct/AddProduct";
import PrivateComponent from "./components/Private/PrivateComponent";
import Carts from "./components/Carts/Carts";
import User from "./components/User/User";
import Purchase from "./components/Purchase/Purcahse";
import FilterProduct from "./components/FetchProduct/FilterProduct";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
                <Route element={<PrivateComponent/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/add/product" element={<AddProduct/>}></Route>
          <Route path="/carts" element={<Carts/>}></Route>
          <Route path="/profile" element={<User/>}></Route>
          <Route path="/purchase" element={<Purchase/>}></Route>
          <Route path="/filter" element={<FilterProduct/>}></Route>
          </Route> 
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>   

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
