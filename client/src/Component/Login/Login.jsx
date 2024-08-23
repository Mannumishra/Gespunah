import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Profile from '../Profile/Profile';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://api.gespunah.com/api/user/login", data);
      console.log(res.data.data._id);
      if (res.status === 200) {
        sessionStorage.setItem("login", true);
        sessionStorage.setItem("userid", res.data.data._id);
        sessionStorage.setItem("name", res.data.data.name);
        sessionStorage.setItem("role", res.data.data.role);
        sessionStorage.setItem("token", res.data.token);
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const isLogin = sessionStorage.getItem("login");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  if (isLogin) {
    return <div>
      <Profile />
    </div>;
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>
      </div>
      <div className="login-content">
        <form className="login-form" onSubmit={postData}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={getInputData} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required onChange={getInputData} />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Register</Link></p>
          <p><Link to="/forgetpassword-1">Forgot your password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
