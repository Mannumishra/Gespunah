import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const navigate = useNavigate()
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const getInputFile = (e) => {
        const { name, files } = e.target
        setData({ ...data, [name]: files[0] })
    }
    const postData = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("phone", data.phone)
            formData.append("address", data.address)
            formData.append("pin", data.pin)
            formData.append("city", data.city)
            formData.append("state", data.state)
            formData.append("pic", data.pic)
            let res = await axios.put("https://api.gespunah.com/api/user/" + sessionStorage.getItem("userid"), formData)
            console.log(res)
            if (res.status === 200) {
                toast.success("Profile Update successfully")
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAPIData = async () => {
        try {
            let res = await axios.get("https://api.gespunah.com/api/user/" + sessionStorage.getItem("userid"))
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className='container-fluid' style={{ marginTop: "10px" }}>
                <div className='w-75 m-auto'>
                    <h5 className='bg-dark text-center text-light p-2'><strong>Update</strong> Profile </h5>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className='col-md-3 '>
                                <label>Name <sup className='text-danger'>*</sup></label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Enter Name' className='form-control' />
                            </div>
                            <div className='col-md-3'>
                                <label>Phone No <sup className='text-danger'>*</sup></label>
                                <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Enter  Phone Number' className='form-control' />
                            </div>
                            <div className='col-md-6 '>
                                <label>Address</label>
                                <textarea name="address" onChange={getInputData} placeholder='Enter Full Address' className='form-control' value={data.address ?? ""} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-3 '>
                                <label>State</label>
                                <input type="text" name="state" onChange={getInputData} placeholder='Enter State Name' className='form-control' value={data.state ?? ""} />
                            </div>
                            <div className='col-md-3'>
                                <label>City</label>
                                <input type="text" name="city" onChange={getInputData} placeholder='Enter city Name' className='form-control' value={data.city ?? ""} />
                            </div>
                            <div className="col-md-3">
                                <label>Pin</label>
                                <input type="text" name="pin" onChange={getInputData} placeholder='Enter Pin' className='form-control' value={data.pin} />
                            </div>
                            <div className='col-md-3 '>
                                <label>Pic</label>
                                <input type="file" name="pic" onChange={getInputFile} placeholder='Enter State Name' className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <button type='submit' className='btn btn-dark w-100 text-light'>Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile