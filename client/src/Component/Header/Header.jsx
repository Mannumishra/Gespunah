import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import shoppingbag from '../../Images/shoppingbag.webp';
import user from '../../Images/artsebasov_profile-128.webp';
import logo from '../../Images/logo.jpeg';
import facebook from '../../Images/facebook.webp';
import link from '../../Images/linkdin.webp';
import twitter from '../../Images/twitter.webp';
import instagram from '../../Images/instragram.webp';
import menu from '../../Images/menu.webp';
import close from '../../Images/close.webp';
import axios from 'axios';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userid = sessionStorage.getItem("userid")
  const login = sessionStorage.getItem("login")
  const [userdata,setUserdata] = useState({})

  const getUserDetails = async()=>{
    try {
      let res = await axios.get("http://localhost:8000/api/user/" +userid);
      setUserdata(res.data.data);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

useEffect(()=>{
  getUserDetails()
},[])

  return (
    <>
      <div className="navbar-custom">
        <div className="firstnav-custom">
          <div className="childfirst-custom">
            <div><p><Link to='/refundpolicy' style={{ textDecoration: "none", color: "black" }}>Refund Policy</Link></p></div>,
            <div><p><Link style={{ textDecoration: "none", color: "black" }}>Track your Order</Link></p></div>
          </div>
          <div className="childsecond-custom">
            <div>
              <img src={facebook} alt="Facebook" className="social-icon" />
            </div>
            <div>
              <img src={instagram} alt="Instagram" className="social-icon" />
            </div>
            <div>
              <img src={link} alt="LinkedIn" className="social-icon" />
            </div>
            <div>
              <img src={twitter} alt="Twitter" className="social-icon" />
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <div className="desktop-custom">
          <div className="nav-links-custom">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/collection">COLLECTION</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="logo-custom">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-image-custom" />
            </Link>
          </div>
          <div className="icon-custom">
            <div>
              <Link to="/cart">
                <img src={shoppingbag} alt="Shopping Bag" className="icon-image-custom" />
              </Link>
            </div>
            <div>
              <Link to="/login">
               {
                login? <img src={userdata.pic} alt="User" className="icon-image-custom" />:
                 <img src={user} alt="User" className="icon-image-custom" />
               }
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`navbar-custom mobile-custom ${menuOpen ? 'active' : ''}`}>
        <div className="navbarmobile-custom">
          <div className="menu-icon-custom" onClick={toggleMenu}>
            {menuOpen ? (
              <img src={close} alt="" style={{ height: 30 }} />
            ) : (
              <img src={menu} alt="" style={{ height: 30 }} />
            )}
          </div>
          <div className="logo-custom">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-image-custom" />
            </Link>
          </div>
          <div className="icon-custom">
            <div>
              <Link to="/cart">
                <img src={shoppingbag} alt="Shopping Bag" className="icon-image-custom" />
              </Link>
            </div>
            <div>
              <Link to="/login">
                <img src={user} alt="User" className="icon-image-custom" />
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-links-custom">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/shop" onClick={toggleMenu}>
            Shop
          </Link>
          <Link to="/collection" onClick={toggleMenu}>
            COLLECTION
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
          <div className="childsecond-custom">
            <div>
              <img src={facebook} alt="Facebook" className="social-icon" />
            </div>
            <div>
              <img src={instagram} alt="Instagram" className="social-icon" />
            </div>
            <div>
              <img src={link} alt="LinkedIn" className="social-icon" />
            </div>
            <div>
              <img src={twitter} alt="Twitter" className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
