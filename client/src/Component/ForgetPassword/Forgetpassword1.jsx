import React, { useState } from 'react';
import './forgetpassword.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP, Step 3: Enter New Password
    const [data, setData] = useState({
        email: "",
        otp: "",
        password: ""
    });
    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (step === 1) {
                let res = await axios.post("https://api.gespunah.com/api/user/forgetpassword1", { email: data.email });
                if (res.status === 200) {
                    toast.success("OTP sent to your email address");
                    setStep(2);
                }
            } else if (step === 2) {
                let res = await axios.post("https://api.gespunah.com/api/user/forgetpassword2", { email: data.email, otp: data.otp });
                if (res.status === 200) {
                    toast.success("OTP submitted successfully");
                    setStep(3);
                }
            } else if (step === 3) {
                let res = await axios.post("https://api.gespunah.com/api/user/forgetpassword3", { email: data.email, password: data.password });
                if (res.status === 200) {
                    toast.success("Password reset successfully");
                    navigate("/login");
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='forgetpassword'>
            {step === 1 && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email ID</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={getInputData}
                        placeholder='Enter Your Email Address'
                        className='form-control'
                    />
                    <button type="submit" className='btn btn-dark mt-2'>Send OTP</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="otp">Enter OTP</label>
                    <input
                        type="text"
                        name="otp"
                        id="otp"
                        onChange={getInputData}
                        placeholder='Enter OTP'
                        className='form-control'
                    />
                    <button type="submit" className='btn btn-dark mt-2'>Submit OTP</button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Enter New Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={getInputData}
                        placeholder='Enter New Password'
                        className='form-control'
                    />
                    <button type="submit" className='btn btn-dark mt-2'>Change Password</button>
                </form>
            )}
        </div>
    );
};

export default ForgetPassword;
