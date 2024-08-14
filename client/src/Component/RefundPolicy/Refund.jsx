import React, { useEffect } from 'react';
import './Refund.css';

const Refund = () => {

  useEffect(()=>{
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  },[])
  return (
    <div className="refund-container">
      <h1 className="refund-title">Refund Policy</h1>
      <div className="refund-content">
        <section className="refund-section">
          <h2>Introduction</h2>
          <p>
            We value our customers and strive to provide the best products and services. This Refund Policy outlines the conditions under which you may request a refund for your purchase.
          </p>
        </section>
        <section className="refund-section">
          <h2>Eligibility for Refunds</h2>
          <ul>
            <li>Products must be returned within 30 days of the purchase date.</li>
            <li>Items must be unused and in their original packaging.</li>
            <li>Proof of purchase is required for all refund requests.</li>
          </ul>
        </section>
        <section className="refund-section">
          <h2>Non-Refundable Items</h2>
          <ul>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Some health and personal care items</li>
          </ul>
        </section>
        <section className="refund-section">
          <h2>How to Request a Refund</h2>
          <p>
            To request a refund, please contact our customer service team with your order number and the reason for your return. You can reach us at <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </section>
        <section className="refund-section">
          <h2>Processing Time</h2>
          <p>
            Once we receive your returned item, we will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment within 7-10 business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Refund;
