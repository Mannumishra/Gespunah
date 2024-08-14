import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [data, setData] = useState({
        name: "",
        categoryimage: ""
    });
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getfiledata = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const newdata = new FormData();
    newdata.append("name", data.name);
    newdata.append("categoryimage", data.categoryimage);

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        try {
            let res = await axios.post("http://localhost:8000/api/category", newdata);
            if (res.status === 200) {
                toast.success("Product Category is created");
                navigate("/all-category");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="productName" className="form-label">Category Name<sup className='text-danger'>*</sup></label>
                            <input type="text" name="name" id="productName" className="form-control" onChange={getInputData} placeholder='Category Name' />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="productName" className="form-label">Category Image<sup className='text-danger'>*</sup></label>
                            <input type="file" name="categoryimage" id="categoryimage" className="form-control" onChange={getfiledata} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? "Please Wait..." : "Add Category"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddCategory;
