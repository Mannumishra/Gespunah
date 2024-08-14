import React from 'react'
import './Limtedtime.css'
import image1 from "../../Images/section.webp"
import image2 from "../../Images/section1.webp"
import image3 from "../../Images/allsocks.webp"
import { Link } from 'react-router-dom'
const Limtedtime = () => {
    return (
        <>
            <div className="limtedtimesection">
                <div className="limted">
                    <div className="limtedtimefirst">
                        <img src={image2} alt="" />
                        <div className="limtedtext">
                            <p className='limtedtextfirst'>Limted time</p>
                            <p className='limtedtextsecond'>deal</p>
                            <p className='limtedtextthird'>on sneakers</p>
                            <div>
                               <Link to='/shop'> <button className='shopallbutton'>shop all</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="limtedtimesecond">
                        <img src={image1} alt="" />
                        <div className="limtedtext1">
                            <p className='limtedtextfirst1'>Limted time</p>
                            <p className='limtedtextsecond1'>deal</p>
                            <p className='limtedtextthird1'>all loafers are on sale</p>
                            <div>
                               <Link to='/shop'> <button className='shopallbutton1'>shop all</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='stocksale'>
                <div>
                    <img src={image3} alt="" style={{width:"100%"}} />
                </div>
            </div> */}
        </>
    )
}

export default Limtedtime