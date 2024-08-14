import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/product")
            const newData = res.data.data
            setData(newData.reverse())
        } catch (error) {
            console.log(error);
        }
    }
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("http://localhost:8000/api/product/" + _id)
            if (res.status === 200) {
                toast.success("Product deleted successfully")
                getApiData()
            }
        } catch (error) {
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
                    <h4>All Product List </h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope='col'>S.No.</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Collection</th>
                            {/* <th scope='col'>Description</th> */}
                            {/* <th scope='col'>Productdetails</th> */}
                            <th scope='col'>Tag</th>
                            <th scope='col'>Image1</th>
                            <th scope='col'>Image2</th>
                            <th scope='col'>Image3</th>
                            <th scope='col'>Image4</th>
                            <th scope='col'>Pair/Price/Discount/Final Price</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.collectionname}</td>
                                {/* <td>{item.description}</td> */}
                                {/* <td>{item.productdetails}</td> */}
                                <td>{item.tag}</td>
                                <td>
                                    <a href={item.pic1} target='_blank' rel="noopener noreferrer">
                                        <img src={item.pic1} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td>
                                    <a href={item.pic2} target='_blank' rel="noopener noreferrer">
                                        <img src={item.pic2} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td>
                                    <a href={item.pic3} target='_blank' rel="noopener noreferrer">
                                        <img src={item.pic3} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td>
                                    <a href={item.pic4} target='_blank' rel="noopener noreferrer">
                                        <img src={item.pic4} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td>
                                    {
                                        item && item.sizes.map((items, index) =>
                                            <div key={index}>
                                                <span>{items.pair} /</span>
                                                <span>{items.price} &#8377; /</span>
                                                <span>{items.discountprice}% /</span>
                                                <span>{items.finalprice} &#8377; </span>
                                            </div>
                                        )
                                    }
                                </td>
                                <td>
                                    <Link to={`/edit-product/${item._id}`}>
                                        <button className='btn btn-success'>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllProduct