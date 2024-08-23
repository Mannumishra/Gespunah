import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false); // State to manage OTP input box visibility
  const [isVerified, setIsVerified] = useState(false); // State to track if email is verified
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [emailDisabled, setEmailDisabled] = useState(false); // State to disable email input
  const [emailNotEmpty, setEmailNotEmpty] = useState(false); // State to manage the visibility of Send OTP button

  const getInputdata = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Update emailNotEmpty state based on email input value
    if (name === "email") {
      setEmailNotEmpty(value.trim() !== "");
    }
  };

  const postData = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      toast.error("Please verify your email before signing up.");
      return;
    }
    setLoading(true);
    try {
      let res = await axios.post("https://api.gespunah.com/api/user", data);
      if (res.status === 200) {
        toast.success("Signup successful");
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const sendotp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://api.gespunah.com/api/sendotp", { email: data.email });
      if (res.status === 200) {
        toast.success("OTP sent successfully");
        setOtpSent(true); // Show OTP input box after sending OTP
        setEmailDisabled(true); // Disable the email input field
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifybutton = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://api.gespunah.com/api/verifyotp", { email: data.email, otp: data.otp });
      if (res.status === 200) {
        toast.success("Email verified successfully");
        setIsVerified(true); // Hide Verify and Resend OTP buttons after verification
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p>Create a new account to get started.</p>
      </div>
      <div className="signup-content">
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={getInputdata} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={getInputdata}
              disabled={emailDisabled} // Disable email input after OTP is sent
            />
          </div>
          {emailNotEmpty && !otpSent && (
            <div className="form-group">
              <button type="button" className="submit-button mt-2" onClick={sendotp}>{loading ? "Wait" : "Send Otp"}</button>
            </div>
          )}
          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input type="text" id="otp" name="otp" onChange={getInputdata} />
              {!isVerified && (
                <div style={{ display: "flex" }}>
                  <button type="button" className="submit-button mt-2" onClick={verifybutton}>{loading ? "Wait" : "Verify"}</button> &nbsp; &nbsp;
                  <button type="button" className="submit-button mt-2" onClick={sendotp}>{loading ? "Wait" : "Resend Otp"}</button>
                </div>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" onChange={getInputdata} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={getInputdata}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={postData}>
            {loading ? "Wait" : "Sign Up"}
          </button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
