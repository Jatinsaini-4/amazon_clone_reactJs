import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#182332",
        padding: "2rem 0",
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5 className="footerh5">Get to Know Us</h5>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press Releases</a>
              </li>
              <li>
                <a href="#">Amazon Science</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="footerh5">Connect with Us</h5>
            <ul className="footer-links">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="footerh5">Make Money with Us</h5>
            <ul className="footer-links">
              <li>
                <a href="#">Sell on Amazon</a>
              </li>
              <li>
                <a href="#">Sell under Amazon Accelerator</a>
              </li>
              <li>
                <a href="#">Amazon Global Selling</a>
              </li>
              <li>
                <a href="#">Advertise Your Products</a>
              </li>
              <li>
                <a href="#">Amazon Pay on Merchants</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="footerh5">Let Us Help You</h5>
            <ul className="footer-links">
              <li>
                <a href="#">COVID-19 and Amazon</a>
              </li>
              <li>
                <a href="#">Your Account</a>
              </li>
              <li>
                <a href="#">Returns Centre</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ margin: "2rem 0", color: "#555" }}>
        <p>&copy; 1996-2024, Amazon.com, Inc. or its affiliates.</p>
      </div>
    </footer>
  );
}

export default Footer;
