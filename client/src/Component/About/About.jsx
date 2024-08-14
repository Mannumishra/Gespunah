import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(()=>{
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  },[])
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Welcome to Gespunah, your go-to destination for high-quality socks!</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Gespunah has quickly become a leading name in the socks manufacturing industry. We started with a simple mission: to create the most comfortable, durable, and stylish socks available. Our commitment to quality and customer satisfaction has driven our growth and success.
          </p>
        </section>
        <section className="about-section">
          <h2>What We Do</h2>
          <p>
            At Gespunah, we specialize in producing a wide variety of socks for all occasions. Whether you're looking for athletic socks, dress socks, or casual socks, we have something for everyone. Our products are made from the finest materials and are designed to provide the perfect fit and maximum comfort.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Quality: We use only the best materials and craftsmanship.</li>
            <li>Innovation: We continuously strive to improve our products and processes.</li>
            <li>Sustainability: We are committed to environmentally friendly practices.</li>
            <li>Customer Satisfaction: Our customers are at the heart of everything we do.</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Meet the Team</h2>
          <p>
            Our team is composed of dedicated professionals who are passionate about what they do. From our designers to our customer service representatives, every member of the Gespunah family is committed to providing you with the best products and service possible.
          </p>
        </section>
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have any questions or need assistance? Feel free to reach out to us at <a href="mailto:info@gespunah.com">info@gespunah.com</a>. We're here to help!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
