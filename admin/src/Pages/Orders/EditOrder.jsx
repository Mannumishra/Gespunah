import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditOrder = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [step, setStep] = useState(1); // Track the current step
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [orderstatus, setOrderstatus] = useState("");
    const [paymentstatus, setPaymentstatus] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState({
        order_id: '',
        user_details: '',
        length: '',
        breadth: '',
        height: '',
        weight: ''
    });

    // Fetch data for EditOrder step
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:8000/api/checkout/admin/${_id}`);
                setData(orderResponse.data.data);
                setOrderstatus(orderResponse.data.data.orderstatus || "");
                setPaymentstatus(orderResponse.data.data.paymentstatus || "");

                const userResponse = await axios.get(`http://localhost:8000/api/user/${orderResponse.data.data.userid}`);
                setUser(userResponse.data.data);
                setOrderData(prev => ({
                    ...prev,
                    order_id: orderResponse.data.data._id,
                    user_details: userResponse.data.data._id
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again.');
            }
        };

        if (_id) {
            fetchData();
        }
    }, [_id]);

    // Handle login in ShipRocketLogin step
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { email, password };

        try {
            const response = await axios.post('http://localhost:8000/api/login-via-shiprocket', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                localStorage.setItem('shiprocketToken', response.data.token);
                toast.success('Login successful!');
                setStep(3);
            }
        } catch (error) {
            console.log(error)
            toast.error('Login failed! Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(1);

        try {
            const response = await axios.post('http://localhost:8000/api/shiped-order-shiprocket', orderData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response)
            if (response.status === 200) {
                toast.success('Order successfully submitted to ShipRocket and status updated to Shipped!');
                setOrderstatus('Shipped');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            {step === 1 && (
                <div>
                    <h3>Edit Order</h3>
                    <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr><th>ID</th><td>{data._id || 'N/A'}</td></tr>
                            <tr>
                                <th>User Details</th>
                                <td>
                                    <strong>Name:</strong> {user.name || 'N/A'}<br />
                                    <strong>Mob No:</strong> {user.phone || 'N/A'}, <strong>Email:</strong> {user.email || 'N/A'}<br />
                                    <strong>Address:</strong> {user.address || 'N/A'}<br />
                                    <strong>Pin:</strong> {user.pin || 'N/A'}, <strong>City:</strong> {user.city || 'N/A'}, <strong>State:</strong> {user.state || 'N/A'}
                                </td>
                            </tr>
                            <tr>
                                <th>Order Status</th>
                                <td>
                                    {data.orderstatus || 'N/A'}
                                    <br />
                                    {data.orderstatus !== "Delivered" && (
                                        <select
                                            onChange={(e) => setOrderstatus(e.target.value)}
                                            value={orderstatus}
                                            name="orderstatus"
                                            className='form-select mt-3'
                                        >
                                            <option value="" disabled>Select Order Status</option>
                                            {data.sentToShipRocket ? (
                                                <>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Order in Transit">Order in Transit</option>
                                                    <option value="Order Reached to the Final Delivery Station">Order Reached to the Final Delivery Station</option>
                                                    <option value="Out for Delivery">Out for Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="Order is Placed">Order is Placed</option>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Ready to Ship">Ready to Ship</option>
                                                </>
                                            )}
                                        </select>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Payment Mode</th>
                                <td>{data.paymentmode || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Payment Status</th>
                                <td>
                                    {data.paymentstatus || 'N/A'}
                                    <br />
                                    {data.paymentstatus !== "Success" && data.paymentstatus !== "Done" ? (
                                        <select onChange={(e) => setPaymentstatus(e.target.value)} value={paymentstatus} name="paymentstatus" className='form-select mt-3'>
                                            <option value="Pending">Pending</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    ) : ""}
                                </td>
                            </tr>
                            <tr><th>Total</th><td>&#8377;{data.total || 'N/A'}</td></tr>
                            <tr><th>Date</th><td>{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</td></tr>
                            <tr><th>RPPID</th><td>{data.razorpayOrderId || 'N/A'}</td></tr>

                            {/* Show "Update" button only when the status is "Ready to Ship" */}
                            {orderstatus === "Ready to Ship" && (
                                <tr>
                                    <td colSpan={2}>
                                        <button className='btn btn-dark w-100' onClick={() => setStep(2)}>Update</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>ShipRocket Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3>Create New Order</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="length">Package Length (cm)</label>
                            <input
                                type="number"
                                name="length"
                                className="form-control"
                                value={orderData.length}
                                onChange={(e) => setOrderData(prev => ({ ...prev, length: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breadth">Package Breadth (cm)</label>
                            <input
                                type="number"
                                name="breadth"
                                className="form-control"
                                value={orderData.breadth}
                                onChange={(e) => setOrderData(prev => ({ ...prev, breadth: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Package Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                className="form-control"
                                value={orderData.height}
                                onChange={(e) => setOrderData(prev => ({ ...prev, height: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Package Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                className="form-control"
                                value={orderData.weight}
                                onChange={(e) => setOrderData(prev => ({ ...prev, weight: e.target.value }))}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditOrder;
