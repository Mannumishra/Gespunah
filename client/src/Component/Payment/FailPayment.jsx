import React from 'react';
import './FailPayment.css'; // Import the CSS file for styling

const FailPayment = () => {
  return (
    <div className="fail-payment-container">
      <div className="fail-payment-content">
        <img
          src="https://gespunah.com/static/media/logo.f58a69af8ad26e8658ed.jpeg"
          alt="Gespunah"
          className="fail-payment-logo"
        />
        <h1 className="fail-payment-title">Payment Failed</h1>
        <p className="fail-payment-message">
          We’re sorry, but your payment could not be processed. Please try again or contact support if the issue persists.
        </p>
        <a href="/" className="fail-payment-button">Go Back to Home</a>
      </div>
    </div>
  );
};

export default FailPayment;
