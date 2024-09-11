import React, { useEffect, useState } from 'react';
import './Contact.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8000/api/contact", data);
      if (res.status === 200) {
        toast.success("Your query has been sent successfully!");
        setData({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.mess)
        toast.error(error.response.data.mess || "Something went wrong. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Fill out the form below or reach out to us directly at <a href="mailto:gespunah@gmail.com">gespunah@gmail.com</a>.</p>
      </div>
      <div className="contact-content">
        <form className="contact-form" onSubmit={postData}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={data.name} required onChange={getInputData} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={data.email} required onChange={getInputData} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={data.phone} required onChange={getInputData} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={data.message} required onChange={getInputData}></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
