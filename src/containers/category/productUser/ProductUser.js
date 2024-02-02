import React, { useEffect, useState } from "react";
import "./ProductUser.css";
import api from "../../Api";
import axios from "axios";
import { Link, Routes } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function ProductUser() {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:7199/api/Product").then((d) => {
      setProducts(d.data);
      setLoading(false);
    });
  }, []);

  function getAll() {}

  return (
    <div className="container1">
      <div className="row">
        {loading ? (
          <p className="loading">
            <div class="spinner-border" role="status">
  <span class="visually-hidden"></span>
</div>
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
                  <span className="listtag">${p.listPrice}</span>
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
  );
}

export default ProductUser;
