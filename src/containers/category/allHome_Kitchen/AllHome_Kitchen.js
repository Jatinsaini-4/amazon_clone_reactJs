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
    <div>
      <Header />
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
