import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const [order, setOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const logout = () => {
        sessionStorage.clear()
        window.location.reload()
        window.location.href = "/login";
        navigate("/login")
    }
    useEffect(() => {
        const getApiData = async () => {
            try {
                let res = await axios.get("https://api.gespunah.com/api/user/" + sessionStorage.getItem("userid"));
                setUser(res.data.data);
                console.log(res)
            } catch (error) {
                console.log(error);
            }
        };

        const getOrderData = async () => {
            try {
                let res = await axios.get("https://api.gespunah.com/api/checkout/" + sessionStorage.getItem("userid"));
                setOrder(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getApiData();
        getOrderData();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(order.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ordersToDisplay = order.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="container profileheight">
                <div className="row profilepage">
                    <div className="profilebox">
                        {user.pic ? (
                            <img src={user.pic} alt="" className='profileimage' height="400px" width="100%" />
                        ) : (
                            <img src="/img/noimage.png" alt="" height="425px" width="100%" />
                        )}
                    </div>
                    <div className="profilebox">
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{user.address}</td>
                                </tr>
                                <tr>
                                    <th>PIN</th>
                                    <td>{user.pin}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{user.city}</td>
                                </tr>
                                <tr>
                                    <th>State</th>
                                    <td>{user.state}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><Link to="/update-profile" className='btn btn-dark w-100'>Update</Link></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><Link onClick={logout} className='btn btn-dark w-100'>Logout</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h5 className='bg-dark text-light my-5 py-2 text-center'>Order History Section</h5>
                </div>
                {ordersToDisplay.length > 0 ? (
                    ordersToDisplay.map((item, index) => (
                        <div key={index} className="row ordersection">
                            <div className="col-md-4 col-sm-6 orderinfo">
                                <div className="table-responsive">
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Order ID</th>
                                                <td>{item._id}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>{item.orderstatus}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Mode</th>
                                                <td>{item.paymentmode}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Status</th>
                                                <td>{item.paymentstatus}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                            <tr>
                                                <th>Date</th>
                                                <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-6">
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Pic</th>
                                                <th>Name</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.products.map((product, idx) => (
                                                <tr key={idx}>
                                                    <td><a href={product.pic} target='_blank'><img src={product.pic} alt="" style={{ height: 70, width: 70 }} /></a></td>
                                                    <td>{product.productname}</td>
                                                    <td>{product.numberoffoot}</td>
                                                    <td>&#8377;{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>&#8377;{product.price * product.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center'>
                        <p>No Order History Found</p>
                        <Link to='/'><button className='btn btn-primary text-light'>Shop Now</button></Link>
                    </div>
                )}
                {/* Pagination */}
                {totalPages > 1 && (
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages).keys()].map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(pageNumber + 1)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Profile;
