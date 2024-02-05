import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../Api";
import { Link } from "react-router-dom";
import ROUTES from "../../navigation/Router";

function ProceedBuy() {
  const [orderData, setOrderData] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const current = new Date();

  useEffect(() => {
    getOrderDetail();
    totalAmount();
    console.log(orderData);
  }, [getOrderDetail]);

  const totalAmount = () => {
    let price = 0;
    orderData.map((item) => {
      price += item.product.price * item.count;
    });
    setOrderTotal(price);
  };

  function getOrderDetail() {
    api
      .get("https://localhost:7199/api/ShoppingCart/proceedToBuy")
      .then((response) => {
        setOrderData(response.data);
        console.log(orderData);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  return (
    <div>
      <Header />
      <form method="post">
        <br />
        <div className="backgroundWhiteBorder">
          <div className="container">
            <div className="card">
              <div className="card-header bg-dark text-light ml-0 row container">
                <div className="col-6">
                  <i className="fa fa-shopping-cart"></i> &nbsp; Order Summary
                </div>
                <div className="col-6 text-right">
                  <Link
                    to={ROUTES.Cart.name}
                    className="btn btn-outline-info btn-sm"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="container rounded p-2">
                  <div className="row">
                    <div className="col-12 col-lg-6 pb-4">
                      <div className="row">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-info">PickUp Details:</span>
                        </h4>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Name</label>
                        </div>
                        <div className="col-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Phone Number</label>
                        </div>
                        <div className="col-9">
                          <input
                            
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Street Address</label>
                        </div>
                        <div className="col-9">
                          <input
                            
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>City</label>
                        </div>
                        <div className="col-9">
                          <input
                           
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>State</label>
                        </div>
                        <div className="col-9">
                          <input
                            
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Postal Code</label>
                        </div>
                        <div className="col-9">
                          <input
                            
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-5 offset-lg-1">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-info">Order Summary:</span>
                      </h4>
                      <ul className="list-group mb-3">
                        {orderData.map((item) => (
                          <li className="list-group-item d-flex justify-content-between">
                            <div>
                              <h6 className="my-0">{item.product.title}</h6>
                              <small className="text-muted">
                                Quantity: {item.count}
                              </small>
                            </div>
                            <span className="text-muted">
                              ${item.count * item.product.price}
                            </span>
                          </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between bg-light">
                          <small className="text-info">Total (USD)</small>
                          <strong className="text-info">{orderTotal}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-12 col-md-8 pt-2">
                  {/* {toda.getMonth()} */}
                  {/* <p>Today's date is: {current.setDate(current.getDate()+2)}</p> */}
                  {/* {current.setDate(current.getDate()+2)} */}
                    {/* <p >estimate arrival date: @DateTime.Now.AddDays(7).ToShortDateString() - @DateTime.Now.AddDays(14).ToShortDateString()</p> */}
                  </div>
                  <div className="col-12 col-md-4">
                    <button
                      type="submit"
                      value="place order"
                      className="btn btn-success form-control"
                    >
                      place order
                    </button>
                  </div>
                  <div className="col-12 col-md-4">
                    <div id="paypal-button-container"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProceedBuy;
