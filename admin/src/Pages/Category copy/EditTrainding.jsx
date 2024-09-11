import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTrainding = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [data, setData] = useState({
        traindingName: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("traindingName", data.traindingName);
            formData.append("image", data.image);

            const res = await axios.put(`http://localhost:8000/api/bestseller/${_id}`, formData);
            console.log(res);
            if (res.status === 200) {
                toast.success("Best Seller Updated Successfully");
                navigate("/all-trainding");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getApiData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/bestseller/${_id}`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Trainding</h4>
                </div>
                <div className="links">
                    <Link to="/all-trainding" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData} className='row'>
                    <div className="mb-2 col-md-6">
                        <label htmlFor="traindingName" className="form-label">Collection Name <sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="traindingName"
                            id="traindingName"
                            onChange={getInputData}
                            className="form-control"
                            value={data.traindingName}
                        />
                    </div>
                    <div className="mb-2 col-md-6">
                        <label htmlFor="image" className="form-label">Collection Image <sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={getFileData}
                            className='form-control'
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">
                        {loading ? "Please Wait..." : "Update Collection "}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditTrainding;
