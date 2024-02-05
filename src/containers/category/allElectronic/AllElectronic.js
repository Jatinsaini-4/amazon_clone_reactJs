import React, { useEffect, useState } from "react";
import "./AllElectronic.css";
import api from "../../Api";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../home/footer/Footer";
import { Link } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import CircularProgress from "@mui/material/CircularProgress";

import Carousel from "react-bootstrap/Carousel";

function AllElectronic() {
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    setLoading(true);
    axios.get("https://localhost:7199/api/Product/GetElectronic").then((d) => {
      setProducts(d.data);
      setLoading(false);
    });
  }

  return (
    <div>
      <Header />
      <div className="carousel">
        <Carousel
          slide={false}
          variant={"dark"}
          indicators={false}
          nextLabel={""}
          prevLabel={""}
          prevIcon={
            <span aria-hidden="true" className="carousel-control-prev-icon" />
          }
          nextIcon={
            <span aria-hidden="true" className="carousel-control-next-icon" />
          }
          interval={2000}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://m.media-amazon.com/images/G/31/img21/vday/new/R01_VDay24_PC_PlusOneHeader._CB583976611_.jpg"
              alt="Third slide"
            />
          </Carousel.Item>  
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://m.media-amazon.com/images/G/31/img24hp/headphones/noise/xero/1500x300._CB583972617_.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://m.media-amazon.com/images/G/31/img23/BAU-Dec/Laptops_Brand-Banners/Dell_Vostro14_3420_ELP_1500X300._CB570494119_.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          
        </Carousel>
      </div>
      <div className="containerelectronic">
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

export default AllElectronic;
