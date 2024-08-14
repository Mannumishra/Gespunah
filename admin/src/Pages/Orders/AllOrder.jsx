import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrder = () => {
    const [data, setData] = useState([])
    // const navigate = useNavigate()
    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/checkout")
            console.log(res)
            setData(res.data.data)
        } catch (error) { }
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Orders</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    <select>
                        <option value="">All Orders</option>
                        <option value="today">Today's Orders</option>
                        <option value="yesterday">Yesterday's Orders</option>
                        <option value="thisWeek">This Week's Orders</option>
                        <option value="thisMonth">This Month's Orders</option>
                        <option value="thisYear">This Year's Orders</option>
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label>&nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                    />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th scope='col'>Order Id</th>
                            <th scope='col'>Order Status</th>
                            <th scope='col'>Payment Mode</th>
                            <th scope='col'>Payment Status</th>
                            <th scope='col'>Total</th>
                            <th scope='col'>Date</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.reverse().map((item, index) => {
                                return <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item._id}</td>
                                    <td>{item.orderstatus}</td>
                                    <td>{item.paymentmode}</td>
                                    <td>{item.paymentstatus}</td>
                                    <td>&#8377;{item.total}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/edit-order/${item._id}`}><i className='fa fa-eye text-success'></i></Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllOrder;
