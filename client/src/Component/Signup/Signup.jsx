import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })

  const getInputdata = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const postData = async(e)=>{
    e.preventDefault()
    try {
      let res = await axios.post("https://api.gespunah.com/api/user" ,data)
      if(res.status===200){
        toast.success("signup successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p>Create a new account to get started.</p>
      </div>
      <div className="signup-content">
        <form className="signup-form" onSubmit={postData}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required onChange={getInputdata} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={getInputdata} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Phone</label>
            <input type="text" id="password" name="phone" required onChange={getInputdata} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Password</label>
            <input type="password" id="password" name="password" required onChange={getInputdata} />
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
