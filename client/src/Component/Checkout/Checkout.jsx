import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css"

export default function Checkout() {
    const navigate = useNavigate()
    let [user, setUser] = useState({});
    let [cart, setCart] = useState([]);
    let [total, setTotal] = useState(0);
    let [mode, setMode] = useState("COD");

    const getAPIData = async () => {
        try {
            let res = await axios.get('https://api.gespunah.com/api/user/' + sessionStorage.getItem("userid"));
            setUser(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCartData = async () => {
        try {
            let res = await axios.get('https://api.gespunah.com/api/cart/' + sessionStorage.getItem("userid"));
            setCart(res.data.data);
            calculateTotal(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const calculateTotal = (cartItems) => {
        let totalPrice = 0;
        for (const item of cartItems) {
            totalPrice += item.price * item.quantity;
        }
        setTotal(totalPrice);
    };

    const placeOrder = async () => {
        if (user.address === "" || user.pin === "" || user.city === "" || user.state === "") {
            return toast.error("Please fill all shipping details");
        }
        var item = {
            userid: sessionStorage.getItem("userid"),
            paymentmode: mode,
            paymentstatus: "Pending",
            orderstatus: "Order is Placed",
            total: total,
            products: cart
        }
        try {
            if (mode === "COD") {
                const res = await axios.post('https://api.gespunah.com/api/checkout', item);
                console.log(res)
                if (res.status === 201) {
                    toast.success("Order Is Placed")
                    // navigate("/thanku")
                }
                for (let items of cart) {
                    let deleteItem = await axios.delete("https://api.gespunah.com/api/cart/" + items._id)
                    console.log(deleteItem);
                    setCart([]);
                }
            }
            else {
                const res = await axios.post('https://api.gespunah.com/api/checkout', item)
                if (res.data.success) {
                    for (let items of cart) {
                        let deleteItem = await axios.delete("https://api.gespunah.com/api/cart/" + items._id)
                        console.log(deleteItem);
                        setCart([]);
                    }
                    const order = res.data.order;
                    const options = {
                        key: "rzp_live_EiOXHjuoxVVY2U",
                        amount: Math.round(total * 100),
                        currency: "INR",
                        name: "Gespunah",
                        description: `Payment For Gespunah Product`,
                        image: "https://i.pinimg.com/originals/9e/ff/85/9eff85f9a3f9540bff61bbeffa0f6305.jpg",
                        order_id: order?.id,
                        callback_url: `https://api.gespunah.com/api/Payment-Verification`,
                        prefill: {
                            contact: user.phone
                        },
                        notes: {
                            "address": "Razorpay Corporate Office"
                        },
                        theme: {
                            "color": "#2DBCB6"
                        }
                    };
                    const razorpay = new window.Razorpay(options);
                    razorpay.on('payment.failed', function (response) {
                        toast.error('Payment failed. Please try again.');
                    });
                    razorpay.open();
                    razorpay.on('payment.success', async function (response) {
                        toast.success("Payment successful, Order Is Placed");
                    });
                } else {
                    console.log(error)
                    toast.error("Failed to place order. Please try again.");
                }
            }
        } catch (error) {
            console.log("Error placing order:", error);
            toast.error("Error placing order. Please try again.");
        }
    }

    useEffect(() => {
        getAPIData();
        getCartData();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, []);

    return (
        <>
            <div className="container checkoutheigth">
                {
                    cart.length ?
                        <div className="row checkoutpage">
                            <div className="boxcheckout">
                                <h5 className='text-center p-2 bg-dark text-light'>Shipping Details</h5>
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
                                    </tbody>
                                </table>
                            </div>
                            <div className="boxcheckout">
                                <h5 className='text-center p-2 bg-dark text-light'>Products Details</h5>
                                <div className="table-responsive">
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Pair</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td><img src={item.pic} alt="" style={{ height: 100 }} /></td>
                                                        <td>{item.productname}</td>
                                                        <td>{item.pair * item.quantity}</td>
                                                        <td>{item.numberoffoot}</td>
                                                        <td>&#8377;{item.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>&#8377;{item.price * item.quantity}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Final Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>
                                                <select name="mode" onChange={(e) => setMode(e.target.value)} className='form-select'>
                                                    <option value="COD">COD</option>
                                                    <option value="NetBanking">NetBanking/Card/UPI</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}><button className='btn btn-dark w-100' onClick={placeOrder}>Place Order</button></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div> :
                        <div className='text-center my-5'>
                            <p>No Items in Checkout</p>
                            <Link to="/" className='btn btn-dark'>Shop</Link>
                        </div>
                }
            </div>
        </>
    );
}
