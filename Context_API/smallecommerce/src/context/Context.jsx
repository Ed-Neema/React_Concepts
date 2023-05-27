import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducers";


const Cart = createContext();
faker.seed(99)

const Context = ({ children }) => {
    // creating products
     const products = [...Array(20)].map(() => ({
       id: faker.string.uuid(),
       name: faker.commerce.productName(),
       price: faker.commerce.price(),
       image: faker.image.urlLoremFlickr({
         width: 200,
         height: 200,
         category: "nature",
       }),
       fastDelivery: faker.datatype.boolean(),
       inStock: Math.floor(Math.random() * 101),
       ratings: Math.floor(Math.random() * 5) + 1,
     }));

    //  const [state, dispatch] = useReducer(reducer, initialState);
     const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart:[],
        
     });
    //  filter reducer
    const [productState, productDispatch] = useReducer(productReducer, {
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery: "",
    });
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

// export the context so that we won't have to do the below useContext operation in all the files
export const CartState = () => {
    return useContext(Cart);
}
