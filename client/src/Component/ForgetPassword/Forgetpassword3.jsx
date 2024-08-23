import React, { useState } from 'react'
import './forgetpassword.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Forgetpassword3 = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const postdata = async(e)=>{
        e.preventDefault()
        try {
            let res =await axios.post("https://api.gespunah.com/api/user/forgetpassword3" ,data)
            if(res.status===200){
                toast.success("Password Reset Successfully")
                navigate("/login")
            }
        } catch (error) {}
    }
  return (
   <>
    <div className='forgetpassword'>
                <form action="" onSubmit={postdata}>
                <label htmlFor="">Enter email</label>
                    <input type="text" name="email" id="" onChange={getInputData} placeholder='Enter Email' className='form-control' />
                    <label htmlFor="">Enter New Password</label>
                    <input type="text" name="password" id="" onChange={getInputData} placeholder='Enter New Password' className='form-control' />
                    <button className='btn btn-dark mt-2'>Change Password</button>
                </form>
            </div>
   </>
  )
}

export default Forgetpassword3