import React, { useEffect } from 'react';
import './Term.css';

const Term = () => {

  useEffect(()=>{
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  },[])
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <div className="terms-content">
        <section className="terms-section">
          <h2>Introduction</h2>
          <p>
            Welcome to our Terms and Conditions page. These terms and conditions outline the rules and regulations for the use of our website.
          </p>
        </section>
        <section className="terms-section">
          <h2>Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
          </p>
        </section>
        <section className="terms-section">
          <h2>Restrictions</h2>
          <ul>
            <li>You are specifically restricted from publishing any website material in any other media.</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
            <li>Publicly performing and/or showing any website material.</li>
            <li>Using this website in any way that is or may be damaging to this website.</li>
            <li>Using this website in any way that impacts user access to this website.</li>
            <li>Using this website contrary to applicable laws and regulations.</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity.</li>
            <li>Using this website to engage in any advertising or marketing.</li>
          </ul>
        </section>
        <section className="terms-section">
          <h2>Your Privacy</h2>
          <p>
            Please read our Privacy Policy.
          </p>
        </section>
        <section className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. We shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>
        </section>
        <section className="terms-section">
          <h2>Indemnification</h2>
          <p>
            You hereby indemnify to the fullest extent us from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
          </p>
        </section>
        <section className="terms-section">
          <h2>Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Term;
