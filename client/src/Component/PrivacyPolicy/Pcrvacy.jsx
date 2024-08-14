import React, { useEffect } from 'react';
import './Privacy.css';

const Privacy = () => {
 
  useEffect(()=>{
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  },[])

  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content">
        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>
            Welcome to our Privacy Policy page! We respect your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.
          </p>
        </section>
        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Payment details and transaction information</li>
            <li>Usage data and cookies</li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2>How We Protect Your Information</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
          </p>
        </section>
        <section className="privacy-section">
          <h2>Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>
        </section>
        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
