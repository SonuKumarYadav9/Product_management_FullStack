import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AddProduct from "./components/AddProduct/AddProduct";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
                {/* <Route element={<PrivateComponent/>}> */}
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/products" element={<h1>Products</h1>}></Route> */}
          <Route path="/add/product" element={<AddProduct/>}></Route>
          {/* <Route path="/logout" element={<Logout/>}></Route>    */}
          {/* </Route>  */}
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>   

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
