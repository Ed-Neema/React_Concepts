import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CartPage from "./components/Cart";
import React, { useState } from "react";
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/cart" element={<CartPage/>} />
      </Routes>

      <div className="App"></div>
    </>
  );
}

export default App;
