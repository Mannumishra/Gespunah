import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [data, setData] = useState({ image: '' });
    const [loading, setLoading] = useState(false);

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const getApiData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/api/banare/${_id}`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('image', data.image);
        try {
            const res = await axios.put(`http://localhost:8000/api/banare/${_id}`, formData);
            if (res.status === 200) {
                toast.success('Banare Updated successfully');
                navigate('/all-banners');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                    <h4>Edit Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
            <form onSubmit={postData}>
                <div className="row">
                    <div className="col-md-9">
                    <label htmlFor="">Update Banner <sup className='text-danger'>*</sup></label>
                    <input type="file" name="image" id="" onChange={getFileData} className='form-control' /><br />
                    </div>
                    <div className="col-md-3 mt-4">
                    <button className='btn btn-success w-100' disabled={loading}>
                    {loading ? "Updating..." : "Update Banner"}
                  </button>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
