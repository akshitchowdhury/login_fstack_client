import React from 'react'

import { FaHeart } from 'react-icons/fa';
const Fav = ({ isFavorite }) => {
  return (
    <div>
 
 <FaHeart style={{  color: `${isFavorite ? 'red' : 'black'}` , fontSize: '2rem' }} >

 </FaHeart>
 
    </div>
  )
}

export default Fav
