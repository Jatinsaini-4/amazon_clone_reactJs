// import React from 'react'

// function AllMobile() {
//   return (
//     <div>AllMobile</div>
//   )
// }

// export default AllMobile
import React, { useEffect, useState } from "react";
import "./AllMobile.css";
import api from "../../Api";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../home/footer/Footer";
import { Link } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import CircularProgress from "@mui/material/CircularProgress";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function AllMobile() {
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getAll();
  }, []);


  function getAll() {
    setLoading(true);
    axios.get("https://localhost:7199/api/Product/GetMobile").then((d) => {
      setProducts(d.data);
      setLoading(false);
    });
  }

  return (
    <div>
      
      <Header />
      <div className="container123">
      <Carousel>
  <div>
    <img src="https://m.media-amazon.com/images/G/31/img22/WLA/2024/Launches24/OnePlus/Buds3/Teaser3/1400x800_new._CB583971473_.jpg"
 alt="Product 1" />
  </div>
  <div>
    <img src="https://m.media-amazon.com/images/G/31/JanartiQOO/janartIQOO/brandstore/BAUnew/iQOOneo9pro/D112032990_WLD---BAU---iQOO-Neo-9-pro---Design-SIM_Homepage_1400x800_3._CB583960715_.jpg" alt="Product 2" />
  </div>
  <div>
    <img src="https://m.media-amazon.com/images/G/31/img23/Wireless/Isha/Honor/HonorX9B/GW/Feb/3rd/D114340500_1400x800._CB583389264_.jpg" alt="Product 2" />
  </div>
</Carousel>

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

export default AllMobile;
