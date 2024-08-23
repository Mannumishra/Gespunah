import React, { useState } from 'react'
import "./forgetpassword.css"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Forgetpassword1 = () => {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const getInputData = (e) => {
        setEmail(e.target.value)
    }
    const postdata = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:8000/api/user/forgetpassword1", { email: email })
            if (res.status === 200) {
                toast.success("Otp send your email addredd")
                navigate("/forgetpassword-2")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='forgetpassword'>
                <form onSubmit={postdata}>
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
            </div>
        </>
    )
}

export default Forgetpassword1