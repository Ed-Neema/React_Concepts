import React , {useState} from 'react'
import { faker } from "@faker-js/faker";
import SingleProduct from './SingleProduct';

faker.seed(100);

const Home = ({cart, setCart}) => {

const productsArray = [...Array(20)].map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.urlLoremFlickr({
    width: 200,
    height:200,
    category: "nature"
  }),
}));

console.log(productsArray)
console.log(typeof productsArray)

// const [cart, setCart] = useState([]);
const [products] = useState(productsArray);
  return (
    <div className='productContainer'>
        {products.map((prod)=>{
            return <SingleProduct prod={prod} cart={cart} setCart={setCart} key={prod.id} />;
        })}
    </div>
  )
}

export default Home