import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const [loading , setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        categoryimage: ""
    });
    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getfiledata = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const navigate = useNavigate()
    const { _id } = useParams()

    const newdata = new FormData();
    newdata.append("name", data.name);
    newdata.append("categoryimage", data.categoryimage);

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/category/" + _id)
            console.log(res);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const postData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.put("http://localhost:8000/api/category/" + _id, newdata)
            if (res.status === 200) {
                toast.success("Product Category is created")
                navigate("/all-category")
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="productName" className="form-label">Category Name</label>
                            <input type="text" name="name" value={data.name} id="productName" className="form-control" onChange={getInputData} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="productName" className="form-label">Category Image<sup className='text-danger'>*</sup></label>
                            <input type="file" name="categoryimage" id="categoryimage" className="form-control" onChange={getfiledata} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark w-100">{loading?"Please Wait..." :"Updat Category"}</button>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
