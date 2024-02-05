import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../navigation/Router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductUser from "../category/productUser/ProductUser";
import Slider from "react-slick";
import Footer from "./footer/Footer";
import AllMobile from "../category/allMobile/AllMobile";
import { SearchBar } from "./searchBar/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import AllProducts from "../category/allProducts/AllProducts";
import axios from "axios";
import { RecentActors } from "@mui/icons-material";
import CarouselBlock from "./CarouselBlock/CarouselBlock";

function Home() {
  const [Product, setProduct] = useState([]);
  const [proloading, setProLoading] = useState(false);

  useEffect(() => {
    getRecentProduct();
  }, []);

  function getRecentProduct() {
    var get = localStorage.getItem("recentOpen");
    if (get) {
      var convert = JSON.parse(get).reverse();
      if (Array.isArray(convert) && convert.length > 0) {
        Promise.all(
          convert.map((product) =>
            axios
              .get(
                "https://localhost:7199/api/Product/GetProduct?productId=" + product
              )
              .then((response) => response.data)
              .catch((error) => {
                console.error("Error fetching product:", error);
                return null;
              })
          )
        ).then((data) => {
          if (data && data.length > 0) {
            setProduct(data);
          } else {
            console.error("Empty or invalid response data");
          }
          setProLoading(false);
        });
      } else {
        console.error("Invalid or empty recentOpen data");
      }
    } else {
      console.log("no data");
    }
  }
  
  

  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: null,
  };

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Header />
      <div className="home">
        <div className="home__container">
          <CarouselBlock/>
          {/* <Slider {...settings}>
            <Link to={ROUTES.allProducts.name}>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Jan/unrecatf/icici/PC-2_less._CB583013789_.jpg"
                alt="Banner 1"
                className="imagesbanner"
                width="1488"
              />
            </Link>
            <Link to={ROUTES.allMobile.name}>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Lawn_Garden/Ud/2024/Jan/Hero/04-Pc-GW-Hero._CB583325281_.jpg"
                alt="Banner 1"
                width="1488"
              />
            </Link>
            <Link to={ROUTES.allHomeKitchen.name}>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Baby/cnnjpp1/Baby/D92807365-_1_Tallhero_2xx._CB598669664_.jpg"
                alt="Banner 1"
                width="1488"
              />
            </Link>

            <Link to={ROUTES.allMobile.name}>
              <img
               src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg"
                alt="Banner 1"
                width="1488"
              />
            </Link>

            <Link to={ROUTES.allHomeKitchen.name}>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/shoes/2024/MFD/Jan/Unrec/Sports/3000._CB583024006_.jpg"
                alt="Banner 1"
                width="1488"
              />
            </Link>
            <Link to={ROUTES.allElectronic.name}>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/BBS_Dec23/BBS_JAN_499_pc_FDFO_3000x1200._CB583375855_.jpg"
                alt="Banner 1"
                width="1488"
              />
            </Link>
          </Slider> */}
          <div className="main">
            <div className="home__row">
              <ProductUser />
            </div>

            <h3 className="m-4">Your browsing history</h3>
            <div className="Products-related1">
              <Slider {...settings1}>
                {!Product && Product.length > 0 ?(
                  <h4>No Recent View</h4>
                ) : (
                Product.map((p) => (
                    <div key={p.id} className="col-3">
                      <div className="card" style={{ width: "18rem" }}>
                        <Link>
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
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
