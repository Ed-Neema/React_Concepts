import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import React, { useState } from "react";
function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
          exact
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>

      <div className="App"></div>
    </>
  );
}

export default App;
