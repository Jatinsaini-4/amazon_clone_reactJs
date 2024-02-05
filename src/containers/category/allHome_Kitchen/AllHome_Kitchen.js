import React, { useEffect, useState } from "react";
import "./AllHome_Kitchen.css";
import api from "../../Api";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../home/footer/Footer";
import { Link } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import CircularProgress from "@mui/material/CircularProgress";

function AllHomeKitchen() {
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getAll();
    console.log(Products);
  }, []);

  function getAll() {
    setLoading(true);
    axios
      .get("https://localhost:7199/api/Product/GetHome_Kitchen")
      .then((d) => {
        setProducts(d.data);
        setLoading(false);
      });
  }

  return (
    <div className="bg__">
      <Header />
      <div >
        <h2 className="title___">
        <b> Buy Lighting Solutions Online at Amazon India</b>
        </h2>
      <p className="txt_">Explore the wide range of lighting solutions for your home at Amazon India. Shop from a wide range of lighting solutions from top brands like Wipro, SYSKA, PHILIPS, Halonix, Desidiya and many more at Amazon.in.
</p>
      </div>
      <div className="container">
      <div className="bxc-grid__image">
        <img onload="window.uet && uet.call && uet(&quot;af&quot;);" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Lightingstore/Lighting_Header_Mob_3000x700.gif"/>
        <img onload="window.uet && uet.call && uet(&quot;af&quot;);" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Lightingstore/Comp_1.gif"/>
      </div>
      </div>
      <div className="containerhome">
        <div className="row">
          {loading ? (
            <p className="loading">
              <CircularProgress />
            </p>
          ) : (
            Products.map((p, index) => (
              <div key={index} className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <Link to={ROUTES.detail.name + "?id=" + p.id}>
                    <img
                      src={`data:image/jpeg;base64,${p.imageUrl}`}
                      height="300"
                      className="card-img-top"
                      alt="Product"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    Price: <span className="pricetag">$ {p.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllHomeKitchen;
