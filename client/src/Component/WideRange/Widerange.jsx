import React from 'react'
import image from '../../Images/centerimage3.webp'
import image1 from '../../Images/centerimage4.webp'
import './Widerange.css'

const Widerange = () => {
  return (
    <>
     <div className="widerange">
        <div className='widerangetext'>
            <p className='headingwiderange'>Wide range of Designs and Colors</p>
            <p className='textwiderange'>Ganpu offers a diverse range of stylish and comfortable socks, ensuring that there's a perfect pair for every occasion and personal style. From casual to formal, our socks are crafted with the finest materials to provide both comfort and durability.</p>
        </div>
        <div className='wideimage'>
            <img src={image} alt="" style={{marginTop:"30px"}}/>
            <img src={image1} alt="" />
        </div>
    </div>
    </>
  )
}

export default Widerange