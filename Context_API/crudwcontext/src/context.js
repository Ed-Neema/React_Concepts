import React, { createContext, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

faker.seed(100);

export const Cart = createContext();
const Context = ({ children }) => {
  // FETCHING PRODUCTS
  const productsArray = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({
      width: 200,
      height: 200,
      category: "nature",
    }),
  }));

  const [products] = useState(productsArray);
  const [cart, setCart] = useState([]);

  //   function to add product to cart
  const addProductToCart = (product) => {
    setCart([...cart, product]);
  };

  //   function to remove product to cart
  const removeProductFromCart = (product) => {
    setCart(cart.filter((c)=> c.id !== product.id))
  }
//   calculating the total for the cart
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.price),
        0
      )
    );
  }, [cart]);

  return (
    <Cart.Provider
      value={{
        products,
        cart,
        setCart,
        addProductToCart,
        removeProductFromCart,
        total,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default Context;
