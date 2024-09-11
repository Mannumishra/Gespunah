import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const OrderComponent = () => {
    const [orderData, setOrderData] = useState({
        order_id: '',
        order_date: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        address: '',
        product_name: '',
        product_quantity: '',
        product_price: '',
        length: '',
        breadth: '',
        height: '',
        weight: ''
    });

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/create-order', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Order successfully submitted!');
                // Optionally clear the form or do other UI updates
            }
        } catch (error) {
            toast.error('Failed to submit the order. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit}>
                {/* Other order fields */}
                <div className="form-group">
                    <label htmlFor="length">Package Length (cm)</label>
                    <input
                        type="number"
                        name="length"
                        className="form-control"
                        value={orderData.length}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit Order</button>
            </form>
        </div>
    );
};

export default OrderComponent;
