import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import api from "../../Api";
import Header from "../../../components/Header";
import Footer from "../../home/footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import CircularProgress from "@mui/material/CircularProgress";

function AllProducts() {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    setLoading(true);
    axios.get("https://localhost:7199/api/Product").then((d) => {
      setProducts(d.data);
      setLoading(false);
    });
  }

  return (
    <div>
      <Header />
      <div className="containerProduct">
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
                    {/* <p className="card-text">{p.description}</p> */}
                    Price: <span className="pricetag">$ {p.price}</span>
                    {/* <button className="btn btn-warning">{p.price}
                  <strong> $</strong>
                  </button> */}
                    {/* <button className="btn btn-primary mx-3">Detail</button> */}
                    {/* <Link to={ROUTES.detail.name + "?id=" + p.id} class="btn btn-primary">
                Detail
              </Link> */}
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

export default AllProducts;
