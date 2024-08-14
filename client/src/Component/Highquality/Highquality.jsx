import React from 'react'
import image from '../../Images/centerimage2.webp'
import './Highquality.css'

const Highquality = () => {
  return (
    <>
    <div className="highquality">
        <div className='hiquaimg'>
            <img src={image} alt="" />
        </div>
        <div className='highquatext'>
            <p className='headinghighqua'>High-Quality Stylish Socks</p>
            <p className='texthighquality'>Our first service at Sockscarving encompasses a wide range of designs and colors, ensuring that our customers have access to a variety of stylish, comfortable socks for every occasion. Crafted from the finest materials, our socks guarantee both comfort and durability, meeting the highest standards of quality and style.</p>
        </div>
    </div>
    </>
  )
}

export default Highquality