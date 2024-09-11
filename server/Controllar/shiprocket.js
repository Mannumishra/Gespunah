const axios = require('axios');
const User = require("../Model/UserModel");
const Checkout = require("../Model/CheckoutModel");


exports.ShipRocketLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: email,
            password: password
        });
        return res.status(200).json({
            success: true,
            data: response.data,
            msg: "Login successful"
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                msg: error.response.data
            });
        } else if (error.request) {
            return res.status(500).json({
                success: false,
                msg: "No response from ShipRocket server"
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
};

exports.MakeOrderReadyToShip = async (req, res) => {
    try {
        const { length, breadth, height, weight, order_id, user_details } = req.body;

        // Fetch the user details
        const user = await User.findById(user_details);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        // Fetch the order details
        const order = await Checkout.findById(order_id);
        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "Order not found"
            });
        }

        // Check if the order has already been sent to ShipRocket
        if (order.sentToShipRocket) {
            return res.status(400).json({
                success: false,
                msg: "Order has already been sent to ShipRocket"
            });
        }

        // Map OrderItems array for shipment
        const orderItemsArray = order.products.map((item, index) => ({
            name: item.productname,
            sku: item.productid.sku || `MKV${index + 1}`,
            units: parseInt(item.quantity),
            selling_price: parseFloat(item.price),
            discount: "",
            tax: "",
            hsn: 441122,
            image: item.pic
        }));

        // Fetch token from ShipRocket
        const loginResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: 'mannu22072000@gmail.com', // Replace with actual email
            password: 'Mannu@2207'         // Replace with actual password
        });

        const token = loginResponse.data.token;

        const data = {
            "order_id": order_id,
            "order_date": new Date().toISOString(),
            "billing_customer_name": user.name,
            "billing_last_name": "",
            "billing_address": user.address,
            "billing_address_2": "",
            "billing_city": user.city,
            "billing_pincode": user.pin,
            "billing_state": user.state,
            "billing_country": "India",
            "billing_email": user.email,
            "billing_phone": user.phone || "9876543210",
            "shipping_is_billing": true,
            "order_items": orderItemsArray,
            "payment_method": 'COD',
            "shipping_charges": 0,
            "giftwrap_charges": 0,
            "transaction_charges": 0,
            "total_discount": 0,
            "sub_total": order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            "length": length,
            "breadth": breadth,
            "height": height,
            "weight": weight
        };

        // Sending request to Shiprocket API
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Update the order to indicate it has been sent to ShipRocket
        order.sentToShipRocket = true;
        await order.save();

        return res.status(200).json({
            success: true,
            msg: "Shipping is Done",
            data: response.data
        });

    } catch (error) {
        console.log(error);
        if (error.response) {
            const errorMessage = error.response.data.message || "Unknown Error";
            const errors = error.response.data.errors || [];
            const statusCode = error.response.data.status_code || 500;
            return res.status(statusCode).json({
                success: false,
                msg: errorMessage,
                errors: errors
            });
        } else if (error.request) {
            return res.status(500).json({
                success: false,
                msg: "No response from ShipRocket server"
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
};





// const axios = require('axios');
// const User = require("../Model/UserModel");
// const Checkout = require("../Model/CheckoutModel");

// exports.ShipRocketLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
//             email: email,
//             password: password
//         });
//         return res.status(200).json({
//             success: true,
//             data: response.data,
//             msg: "Login successful"
//         });
//     } catch (error) {
//         if (error.response) {
//             return res.status(error.response.status).json({
//                 success: false,
//                 msg: error.response.data
//             });
//         } else if (error.request) {
//             return res.status(500).json({
//                 success: false,
//                 msg: "No response from ShipRocket server"
//             });
//         } else {
//             return res.status(500).json({
//                 success: false,
//                 msg: "Internal Server Error"
//             });
//         }
//     }
// };

// exports.MakeOrderReadyToShip = async (req, res) => {
//     try {
//         const { length, breadth, height, weight, order_id, user_details } = req.body;

//         // Fetch the user details
//         const user = await User.findById(user_details);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "User not found"
//             });
//         }

//         // Fetch the order details
//         const order = await Checkout.findById(order_id);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Order not found"
//             });
//         }
//         console.log(order)
//         // Map OrderItems array for shipment
//         const orderItemsArray = order.products.map(item => ({
//             name: item.productname,
//             sku: item.productid.sku || "123",
//             units: parseInt(item.quantity),
//             selling_price: parseFloat(item.price),
//             discount: "",
//             tax: "",
//             hsn: 441122,
//             image: item.pic

//         }));

//         // Fetch token from ShipRocket
//         const loginResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
//             email: 'mannu22072000@gmail.com', // Replace with actual email
//             password: 'Mannu@2207'         // Replace with actual password
//         });

//         const token = loginResponse.data.token;

//         const data = {
//             "order_id": order_id,
//             "order_date": new Date().toISOString(),
//             "billing_customer_name": user.name,
//             "billing_last_name": "",
//             "billing_address": user.address,
//             "billing_address_2": "",
//             "billing_city": user.city,
//             "billing_pincode": user.pin,
//             "billing_state": user.state,
//             "billing_country": "India",
//             "billing_email": user.email,
//             "billing_phone": user.phone || "9876543210",
//             "shipping_is_billing": true,
//             "order_items": orderItemsArray,
//             "payment_method": 'COD',
//             "shipping_charges": 0,
//             "giftwrap_charges": 0,
//             "transaction_charges": 0,
//             "total_discount": 0,
//             "sub_total": order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0),
//             "length": length,
//             "breadth": breadth,
//             "height": height,
//             "weight": weight
//         };
//         console.log(data)
//         // Sending request to Shiprocket API
//         const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', data, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         return res.status(201).json({
//             success: true,
//             msg: "Shipping is Done",
//             data: response.data
//         });

//     } catch (error) {
//         console.log(error)
//         if (error.response) {
//             const errorMessage = error.response.data.message || "Unknown Error";
//             const errors = error.response.data.errors || [];
//             const statusCode = error.response.data.status_code || 500;
//             return res.status(statusCode).json({
//                 success: false,
//                 msg: errorMessage,
//                 errors: errors
//             });
//         } else if (error.request) {
//             return res.status(500).json({
//                 success: false,
//                 msg: "No response from ShipRocket server"
//             });
//         } else {
//             return res.status(500).json({
//                 success: false,
//                 msg: "Internal Server Error"
//             });
//         }
//     }
// };
