import React, { useEffect, useState } from 'react';
import './Singlepage.css';
import Shop from '../Shop/Shop';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const SinglePage = () => {
  const navigate = useNavigate();
  const [singleData, setSingleData] = useState({});
  const [backendImages, setBackendImages] = useState([]);
  const { _id } = useParams();
  const [qty, setQty] = useState(1);
  const [activeSize, setActiveSize] = useState(null);
  const [activeSizePrice, setActiveSizePrice] = useState(null);
  const [activeSizeDiscount, setActiveSizeDiscount] = useState(null);
  const [activeSizeFinalPrice, setActiveSizeFinalPrice] = useState(null);
  const [activeSizeStock, setActiveSizeStock] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [footnumber, setFootnumber] = useState(null);

  const loginvalue = sessionStorage.getItem("login");

  const handleSize = (size) => {
    setActiveSize(size.pair);
    setActiveSizePrice(size.price);
    setActiveSizeDiscount(size.discountprice);
    setActiveSizeFinalPrice(size.finalprice);
  };

  const handleFootNumber = (size) => {
    setFootnumber(size);
  };

  const getsingleProductData = async () => {
    try {
      let res = await axios.get("https://api.gespunah.com/api/product/" + _id);
      console.log(res);
      setSingleData(res.data.data);
      const { pic1, pic2, pic3, pic4 } = res.data.data;
      const images = [pic1, pic2, pic3, pic4].filter(img => img);
      setBackendImages(images);
      if (res.data.data.sizes && res.data.data.sizes.length > 0) {
        handleSize(res.data.data.sizes[0]);
      }
      if (res.data.data.numberoffoot && res.data.data.numberoffoot.length > 0) {
        handleFootNumber(res.data.data.numberoffoot[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const images = backendImages;

  useEffect(() => {
    getsingleProductData();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const addToCart = async () => {
    try {
      if (activeSize && activeSizePrice) {
        const newItem = {
          userid: sessionStorage.getItem("userid"),
          productid: singleData._id,
          productname: singleData.name,
          quantity: qty,
          pair: activeSize,
          numberoffoot: footnumber,
          price: activeSizeFinalPrice,
          pic: singleData.pic1
        };
        if (newItem.quantity > 0 && loginvalue === "true") {
          let res = await axios.post('https://api.gespunah.com/api/cart', newItem);
          if (res.status === 200) {
            toast.success("Product Added to cart");
            navigate("/cart");
          }
        } else {
          toast.error("Please login then you can add the product to the cart");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } else {
        console.error('Please select a size.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
      <div className="container-fluid productdetailsheight">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="carousel">
                <div className="carousel-inners">
                  {images.map((image, index) => (
                    <div
                      className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}
                      key={index}
                    >
                      <img src={image} className="singlrpageimage" alt={`Slide ${index}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" onClick={handlePrevClick}>
                  <span className="carousel-control-prev-icon">&#9664;</span>
                </button>
                <button className="carousel-control-next" onClick={handleNextClick}>
                  <span className="carousel-control-next-icon">&#9654;</span>
                </button>
              </div>
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    src={image}
                    className={`singlrpageimageslide ${index === currentImageIndex ? 'active' : ''}`}
                    alt={`Thumbnail ${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="col-lg-6 productsecondcol">
              <p className="productname">{singleData.name}</p>
              <p className='productdetails'>{singleData.productdetails}</p>
              <div className="stars">
                <i className="fa fa-star text-warning starticons"></i>
                <i className="fa fa-star text-warning starticons"></i>
                <i className="fa fa-star text-warning starticons"></i>
                <i className="fa fa-star text-warning starticons"></i>
                <i className="fa fa-star starticons"></i>
                <p className='starnumber'>(1210)</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="sizes">
                    <select className="size-select" value={activeSize} onChange={handleSize}>
                      {singleData.sizes ? (
                        singleData.sizes.map((item, index) => (
                          <option value={item.pair} key={index}>
                            Pair : {item.pair}
                          </option>
                        ))
                      ) : null}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="sizes">
                    <select className="size-select" value={footnumber} onChange={(e) => handleFootNumber(e.target.value)}>
                      {singleData.numberoffoot ? (
                        singleData.numberoffoot.map((item, index) => (
                          <option value={item} key={index}>
                            Size : {item}
                          </option>
                        ))
                      ) : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="price-details">
                <div>
                  <del className='text-dark'>Rs.{activeSizePrice.toFixed(0)}</del>
                </div>
                <div className='text-danger' style={{ fontSize: 25 }}>
                  Rs.{activeSizeFinalPrice.toFixed(0)}
                </div>
                <div>
                  | Save Rs.{activeSizeDiscount.toFixed(0)}
                </div>
              </div>
              <div>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <p className='productdecription'>Product Description</p>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                      <div className="accordion-body">
                        <p>{singleData.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="quantity">
                <button className="btn btn-minus" onClick={() => qty > 1 ? setQty(qty - 1) : ""}>-</button>
                <p className="qty">{qty}</p>
                <button className="btn btn-plus" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <div className='buttondiv'>
                <button className="add-to-cart-btn" onClick={addToCart}>
                  <i className="fa fa-shopping-bag"></i> Add to cart
                </button>
                {/* <button className="add-to-cart-btn">
                  <i className="fa fa-shopping-bag"></i> Buy Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <Shop />
      </div>
    </>
  );
};

export default SinglePage;
