import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Trainding = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        traindingName: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("traindingName", data.traindingName);
            formData.append("image", data.image);

            const res = await axios.post("http://localhost:8000/api/bestseller", formData);
            console.log(res);
            if (res.status === 200) {
                toast.success("Best Seller Product created successfully");
                navigate("/all-trainding");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Trainding</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData} className='row'>
                    <div className="mb-2 col-md-6">
                        <label htmlFor="traindingName" className="form-label">Collection Name <sup className='text-danger'>*</sup></label>
                        <input type="text" name="traindingName" id="productName" className="form-control" onChange={getInputData} placeholder='Collection Name' />
                    </div>
                    <div className="mb-2 col-md-6">
                        <label htmlFor="image" className="form-label">Collection Image <sup className='text-danger'>*</sup></label>
                        <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                    </div>
                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? "Please Wait..." : "Add Collection"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Trainding;
