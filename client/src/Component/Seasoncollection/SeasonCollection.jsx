import React, { useEffect, useState } from 'react'
import "./Season.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
const SeasonCollection = () => {
    const [data, setData] = useState([])
    const [hoveredProduct, setHoveredProduct] = useState(null);
  
    const handleMouseEnter = (index) => {
      setHoveredProduct(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredProduct(null);
    };
  
    const getApiProductdata = async () => {
      try {
        let res = await axios.get("http://localhost:8000/api/product")
        console.log(res)
        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      getApiProductdata()
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    }, [])
   
    return (
        <>
            <div>
                <p className='shopheading'>Shop Our Entire Selection</p>
                <div className="product-list">
                    {data.map((product, index) => (
                        <div key={product.id} className="product-card" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                            <div className="product-images">
                                <img src={hoveredProduct === index ? product.pic1 : product.pic2} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h2 className="product-name">{product.name}</h2>
                                {/* <p className="text-center">{product.productdetails}</p> */}
                                <div className="product-rating">
                                    <span><i class="ri-star-fill"></i></span>
                                    <span><i class="ri-star-fill"></i></span>
                                    <span><i class="ri-star-fill"></i></span>
                                    <span><i class="ri-star-fill"></i></span>
                                    <span><i class="ri-star-fill"></i></span>
                                </div>
                                <div className="product-price">
                                    <span className="original-price">&#8377;{product.sizes[0].price}</span>
                                    <span className="new-price">&#8377;{product.sizes[0].finalprice.toFixed(0)}</span>
                                    <span className='text-danger'>Save {product.sizes[0].discountprice}%</span>
                                </div>
                                <Link to={`/details/${product._id}`}><button className="add-to-cart-button">View Details</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='viewbutton'>
                    <button className="viewallbutton"><Link className="text-light text-decoration-none" to='/shop'>View All</Link></button>
                </div>
            </div>
        </>
    )
}

export default SeasonCollection