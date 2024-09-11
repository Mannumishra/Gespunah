import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);

  const getCartdata = async () => {
    try {
      let res = await axios.get("https://api.gespunah.com/api/cart/" + sessionStorage.getItem("userid"))
      setData(res.data.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const updateItem = async (itemId, action) => {
    try {
      const itemToUpdate = data.find(item => item._id === itemId);
      if (!itemToUpdate) return;
      let updatedQty = itemToUpdate.quantity;
      if (action === "INC") {
        updatedQty += 1;
      } else if (action === "DEC" && itemToUpdate.quantity > 1) {
        updatedQty -= 1;
      } else {
        return;
      }
      const res = await axios.put(`https://api.gespunah.com/api/cart/${itemId}`, { quantity: updatedQty });
      console.log(res);
      getCartdata();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (_id) => {
    try {
      let res = await axios.delete('https://api.gespunah.com/api/cart/' + _id);
      console.log(res);
      getCartdata();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartdata()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <>
      {
        data.length ? <div className="container-fluid py-3 ">
          <div className="container py-3">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Pair</th>
                    <th scope="col">Size</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Delete Item</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img src={item.pic} className="img-fluid me-5 rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{item.productname}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">&#8377;{item.price}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{item.pair*item.quantity}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{item.numberoffoot}</p>
                      </td>
                      <td>
                        <div className="input-group quantity mt-4" style={{ width: "150px" }}>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => updateItem(item._id, "DEC")}>
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <p className='mx-3'>{item.quantity}</p>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => updateItem(item._id, "INC")}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">&#8377;{item.price * item.quantity}</p>
                      </td>
                      <td>
                        <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => { deleteItem(item._id) }}>
                          <i className="fa fa-times text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8"></div>
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                {/* Removed subtotal and total section */}
                <Link to='/checkout' className="btn btn-dark border-primary w-100 text-light text-uppercase" type="button">Proceed Checkout</Link>
              </div>
            </div>
          </div>
        </div> :
          <>
            <div className='text-center'>
              <p className='text-center' style={{ marginTop: "150px", fontWeight: 500 }}>No Item in cart</p>
              <Link to="/"> <button className='btn btn-dark text-center'>Shop Now</button></Link>
            </div>
          </>
      }
    </>
  );
};

export default Cart;
