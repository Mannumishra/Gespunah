import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const [orderId, setOrderid] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const OrderId = queryParams.get('Order');
    setOrderid(OrderId);
  }, [location]);
  return (
    <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-6 mb-5" data-aos="fade-up">
        <h2 className="display-4 text-danger mb-4">Payment Successful!</h2>
        <p className="fs-5 mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h3 className="card-title fs-4">Order Information</h3>
           
          </div>
        </div>
        <Link to={'/'} className="btn btn-primary btn-lg">
          Shop More
        </Link>
      </div>
      <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left">
        <img src="https://i.ibb.co/T0wvNJf/image.png" alt="Success" className="img-fluid rounded" />
      </div>
    </div>
  </div>
  )
}

export default Payment