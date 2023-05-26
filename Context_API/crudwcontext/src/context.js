import React, {createContext} from 'react'

const Cart = createContext();
const context = () => {
  return (
    <Cart.Provider value={{}}>
        
    </Cart.Provider>
  )
}

export default context