import React from 'react'
import {FaStar,FaRegStar} from 'react-icons/fa'
const Rating = ({rating, onClick, style}) => {
  return ( 
    <div>{
        [...Array(5)].map((_,i)=>{
            return (
              <span key={i} onClick={()=>onClick(i)} style={style}>
                {rating > i ? <FaStar size={15} /> : <FaRegStar size={15} />}
              </span>
            );
        })
    }</div>
  )
}

export default Rating