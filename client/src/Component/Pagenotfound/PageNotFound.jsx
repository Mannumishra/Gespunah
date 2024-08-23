import React from 'react';
// import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <img
          src="https://essentialwebapps.com/wp-content/uploads/2022/04/error-404-page-not-found-animate.jpg" // Example image for illustration
          alt="404 Error"
          className="page-not-found-image"
        />
        <h1 className="page-not-found-title">Oops! Page Not Found</h1>
        <p className="page-not-found-message">
          It looks like the page you're looking for doesn't exist. Maybe you mistyped the URL or the page has been moved.
        </p>
        <a href="/" className="page-not-found-button">Go Back to Home</a>
      </div>
    </div>
  );
};

export default PageNotFound;
