import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import imagee1 from "../../Images/logo.jpeg"
const Footer = () => {
  return (
    <>
      <section className='footerset'>
        <div className="footer">
          {/* <div>
            <a href="https://wa.me/916201301973?text=Hello" class="floating" target="_blank">
              <i class="fab fa-whatsapp fab-icon"></i>
            </a>
          </div> */}
          <div className="footermain">
            <div className="first">
              <img src={imagee1} alt="" style={{ height: 50 }} />
              <p className='fotertext'>GESPUNAH specializes in manufacturing socks. Our company excels in producing a wide range of socks, including work socks, using high-quality materials and innovative designs to ensure comfort and durability.</p>
            </div>
            <div className="second">
              <p className='footerheading'>QUICK LINKS</p>
              <div className="linksdiv">
                <div>
                  <p className='fotertextlink'><Link to='/'>Home</Link></p>
                  <p className='fotertextlink'><Link to='/about'>About Us</Link></p>
                  <p className='fotertextlink'><Link to='/contact'>Shop</Link></p>
                  <p className='fotertextlink'><Link to='/contact'>Contact Us</Link></p>
                </div>
                <div>
                <p className='fotertextlink'><Link to='/privacypolicy'>Privacy Policy</Link></p>
                  <p className='fotertextlink'><Link to='/refundpolicy'> Refund Policy</Link></p>
                  <p className='fotertextlink'><Link to='/term'>Terms & Conditions</Link></p>
                </div>
              </div>
            </div>
            <div className="third">
              <p className='footerheading'>CONTACT US</p>
              <div className="">
                <p style={{ fontSize: 15 }}>Call us : <span><a href="tel:+917678673589" style={{ color: "white" }}>+91 76786 73589 </a></span></p>
                {/* <p style={{fontSize:15}}>Call us (Air Import) : <span><a href="tel:+919555686520"  style={{color:"white"}}>+91 9555686520 </a></span></p>
                <p style={{fontSize:15}}>Call us (Sea Import) : <span><a href="tel:+919540603266"  style={{color:"white"}}>+91 9540603266 </a></span></p>
                <p style={{fontSize:15}}>Call us (Air & Sea Export)  : <span><a href="tel:+919599297900"  style={{color:"white"}}>+91 9599297900 </a></span></p> */}
                <p style={{ fontSize: 15 }}>Email : <span><a href="mailto: gespunah@gmail.com" style={{ color: "white" }}> gespunah@gmail.com</a></span></p>
              </div>
            </div>
            <div className="four">
              <p className='footerheading'>FOLLOW US</p>
              <p className='fotertext'>Follow and discover the time-tested secrets of TCI with us!</p>
              <div className="iconset">
                <Link style={{ textDecoration: "none", color: "#3b5998" }}> <i class="ri-facebook-circle-fill"></i></Link>
                <Link style={{ textDecoration: "none", color: "#ee2a7b" }}> <i class="ri-instagram-line"></i></Link>
                <Link style={{ textDecoration: "none", color: "#FF0000" }}> <i class="ri-youtube-line"></i></Link>
                <Link style={{ textDecoration: "none", color: "#0A66C2" }}><i class="ri-linkedin-box-fill"></i></Link>
                <Link style={{ textDecoration: "none", color: " #1DA1F2" }}><i class="ri-twitter-line"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer