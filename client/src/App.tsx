import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import React from 'react';
import Register from "./pages/Register";
import { ProductsDetail } from "./pages/ProductsDetail";
import Cart from "./pages/Cart";
import { AdminRoutes } from "./admin/AdminRoutes";



function App() {
  return (
    <>
  
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/cart/:userid" element={<Cart/>}/>
       
        
    
        {AdminRoutes}
      </Routes>
      </>
  );
}

export default App;
