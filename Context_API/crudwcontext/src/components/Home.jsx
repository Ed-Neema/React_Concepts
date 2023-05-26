import React, { useState, useContext } from "react";

import SingleProduct from "./SingleProduct";
import { Cart } from "../context";

const Home = () => {
  // const [cart, setCart] = useState([]);
  const { products } = useContext(Cart);

  return (
    <div className="productContainer">
      {products.map((prod) => {
        return <SingleProduct prod={prod} key={prod.id} />;
      })}
    </div>
  );
};

export default Home;
