import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        image: ""
    });
    const [loading, setLoading] = useState(false);

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };
    const formData = new FormData();
    formData.append("image", data.image);
    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await axios.post("http://localhost:8000/api/banare", formData);
            if (res.status === 200) {
                toast.success("Banare Created Successfully");
                navigate("/all-banners");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Failed to create Banare");
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>
            <div className="d-form">
                <form onSubmit={postData}>
                   <div className="row">
                    <div className="col-md-9">
                    <label htmlFor="image">Select Image For Banner <sup className="text-danger">*</sup></label>
                    <input type="file" name="image" id="image" onChange={getFileData} className="form-control" /><br />
                   
                    </div>
                    <div className="col-md-3 mt-4">
                    <button type="submit" className="btn btn-dark w-100">
                        {loading ? "Uploading..." : "Add New Banner"}
                    </button>
                    </div>
                   </div>
                </form>
            </div>
        </>
    );
}

export default AddBanner;
