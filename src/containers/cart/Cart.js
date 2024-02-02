import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Divider } from "@mui/material";
import "./Cart.css";
import axios from "axios";
import { useHistory, useNavigate } from "react-router";
import Footer from "../home/footer/Footer";
import Empty from "../buy/empty/Empty";
import Option from "../buy/option/Option";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Api";
import ROUTES from "../../navigation/Router";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [val, setVal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getShoppingCart();
  }, []);

  useEffect(() => {
    totalAmount();
    localStorage.setItem("cartLength", cart.length);
    console.log(price);
  }, [cart]);

  function deleteShoppingCart(id) {
    api
      .delete(`https://localhost:7199/api/ShoppingCart/DeleteCart?id=${id}`)
      .then((response) => {
        toast.success("Item remove from cart!", {
          position: "top-center",
        });
        getShoppingCart();
      });
  }

  function plusShoppingCart(id,count)
  {
    api.post(`https://localhost:7199/api/ShoppingCart/plus?id=${id}&count=${count}`)
    .then((response) => {
      toast.success("Item cart updated", {
        position: "top-center",
      });
      console.log(response.data)
      getShoppingCart();
    });
  }

  function getShoppingCart() {
    api
      .get("https://localhost:7199/api/ShoppingCart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  const totalAmount = () => {
    let price = 0;
    cart.map((item) => {
      price += item.product.price;
    });
    setPrice(price);
  };

  return (
    <div className="bg">
      <Header />
      <>
        {cart.length ? (
          <div className="buynow_section">
            <div className="buynow_container">
              <div className="left_buy">
                <h1>Shopping Cart</h1>
                <p>Select all items</p>
                <span className="leftbuyprice">Price</span>
                <Divider />
                {cart.map((item) => (
                  <div key={item.id} className="item_containert">
                    <img
                      src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                      alt="imgitem"
                    />
                    <div className="item_details">
                      <h3>{item.product.title}</h3>
                      <h3 className="diffrentprice">
                        ${item.product.listPrice}.00
                      </h3>
                      <p className="unusuall">Usually dispatched in 8 days.</p>
                      <p>Eligible for FREE Shipping</p>
                      <img
                        src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                        alt="logo"
                      />
                      <div className="add_remove_select">
                        <select
                          name=""
                          key={item.id}
                          onChange={(e) =>{
                            plusShoppingCart(item.id,e.target.value)
                            console.log("Selected value:", e.target.value,"%d",item.id)
                          }                            
                          }>
                          <option >{item.count}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        {/* <div className="row">
                          <div key={item.id} className="input-group">
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => console.log("minus", item.id)}
                              >
                                -
                              </button>
                            </div>
                            <input
                              style={{ width: "40px" }}
                              readOnly={true}
                              // value={num} onChange={handleChange}
                            />
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => console.log("plus", item.id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div> */}
                        <p
                          onClick={() => deleteShoppingCart(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </p>
                        <span>|</span>
                        <p
                          className="forremovemedia"
                          style={{ cursor: "pointer" }}
                        >
                          Save Or Later
                        </p>
                        <span>|</span>
                        <p
                          className="forremovemedia"
                          style={{ cursor: "pointer" }}
                        >
                          See More like this
                        </p>
                        <ToastContainer />
                      </div>
                    </div>
                    <h3 className="item_price">${(item.product.price)*(item.count)}.00</h3>
                  </div>
                ))}
                <Divider />
                <div className="sub_item">
                  <h3>
                    Subtotal ({cart.length} items):
                    <strong style={{ fontWeight: "700", color: "#111" }}>
                      {" "}
                      ${price}.00
                    </strong>
                  </h3>
                </div>
              </div>
              <div className="right_buy">
                <img
                  src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
                  alt="rightimg"
                />
                <div className="cost_right">
                  <p>
                    Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}>
                      {" "}
                      Select this option at checkout. Details
                    </span>
                  </p>
                  <h3>
                    Subtotal ({cart.length} 
                    items):{" "}
                    <span style={{ fontWeight: "700" }}> ₹{price}.00</span>
                  </h3>
                  <Link
                    to={ROUTES.ProceedBuy.name}
                    className="rightbuy_btn btn"
                  >
                    Proceed to Buy
                  </Link>
                  <div className="emi" onClick={() => setVal(!val)}>
                    Emi available
                    {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </div>
                  <span className={val ? "show" : "hide"}>
                    {" "}
                    Your order qualifies for EMI with valid credit cards (not
                    available on purchase of Gold, Jewelry, Gift cards and
                    Amazon pay balance top up). Learn more
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
//  {
//   cart.map((item) => (
//     <div key={item.id}>
//       <p>{item.id}</p>
//       <p>{item.product.title}</p>
//       {/* Render other properties as needed */}
//       <Divider />
//     </div>
//   ))
// }
