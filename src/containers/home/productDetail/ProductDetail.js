import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import { Paper } from "@mui/material";
import "./ProductDetail.css";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../footer/Footer";
import ROUTES from "../../../navigation/Router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../features/counter/counterSlice";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {
  const [proDetail, setProDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proloading, setProLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  const [productid1, setProductid1] = useState(null);
  const [productid2, setProductid2] = useState(null);
  const Select1Message = () => toast.success("Product 1 Selected");
  const Select2Message = () => toast.success("Product 2 Selected");
  const navigate = useNavigate();
  const queryParams = useQuery();
  const [data, setdata] = useState({
    applicationUserId: "",
    productId: 0,
    count:1
  });

  useEffect(() => {
    getProduct();
    getAll();
    recentOpen();
    setdata({
      applicationUserId:localStorage.getItem("applicationUserId"),
      productId: queryParams.get("id"),
      count:1
    })
    console.log(data);
  }, [queryParams]);

  function getAll() {
    setProLoading(true);
    axios.get("https://localhost:7199/api/Product").then((d) => {
      setProducts(d.data);
      setProLoading(false);
    });
  }

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function addcart() {
    axios
      .post("https://localhost:7199/api/ShoppingCart", data)
      .then((res) => {
        dispatch(increment());
        navigate(ROUTES.Cart.name);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  function recentOpen() {
    var getid = localStorage.getItem("recentOpen")
      ? JSON.parse(localStorage.getItem("recentOpen"))
      : [];
    var id = queryParams.get("id");

    if (id && !getid.includes(id)) {
      getid.push(id);
      localStorage.setItem("recentOpen", JSON.stringify(getid));
    } else if (id && getid.includes(id)) {
    } else {
      localStorage.setItem(
        "recentOpen",
        JSON.stringify([queryParams.get("id")])
      );
    }
  }

  function getProduct() {
    setLoading(true);
    axios
      .get(
        "https://localhost:7199/api/Product/GetProduct?productId=" +
          queryParams.get("id")
      )
      .then((response) => {
        setProDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="back">
      <Header />
      <ToastContainer />
      {loading ? (
        <p className="loading">
          <CircularProgress />
        </p>
      ) : (
        <Grid container>
          <div className="row">
            <div class="form-check">
              <input
                class="form-check-input"
                onChange={(e) => setCheck(e.target.checked)}
                type="checkbox"
              />
              {check
                ? localStorage.setItem(
                    "CompareProductId_1",
                    queryParams.get("id")
                  )
                : ""}
              <label class="form-check-label" for="flexCheckDefault">
                Compare 1
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                onChange={(e) => setCheck1(e.target.checked)}
                type="checkbox"
              />

              {check1
                ? localStorage.setItem(
                    "CompareProductId_2",
                    queryParams.get("id")
                  )
                : []}
              <label class="form-check-label" for="flexCheckDefault">
                Compare 2
              </label>
            </div>
          </div>
          <Grid item xs={1}>
            {proDetail && (
              <img
                className="placeorder__image"
                src={`data:image/jpeg;base64,${proDetail.imageUrl}`}
                alt="Product"
              />
            )}
          </Grid>
          <Grid item xs={3}>
            {proDetail && (
              <div className="placeholder__description">
                <div
                  style={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: 500,
                  }}
                >
                  {proDetail.title}
                </div>
                <hr></hr>

                <div>
                  <div className="textgap">
                    Price: <span className="pricetag">$ {proDetail.price}</span>
                  </div>
                  <div className="textgap">
                    FREE delivery: <strong></strong>
                  </div>
                  <div className="textgap">
                    EMI starts at $ 50 No Cost EMI available
                  </div>
                  <div
                    style={{ color: "#007600", fontSize: "20px" }}
                    className="textgap"
                  >
                    In stock
                  </div>
                  <div className="textgap">
                    Sold by <strong>Appario Retail Private Ltd</strong> and
                    Fulfilled by Amazon.
                  </div>
                  <br />
                  <div style={{ fontSize: "24px" }} className="textgap">
                    About this item
                  </div>
                  <div>
                    <ul>
                      {/* {proDetail.id !== undefined ? (
                          proDetail.description.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <span></span>
                        )} */}
                      <div
                        style={{
                          fontSize: "15px",
                          lineHeight: "22px",
                          fontWeight: 70,
                        }}
                      >
                        {proDetail.description}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={3}>
            <div className="placeorder__order">
              <div>
                <Link to={ROUTES.compareProducts.name}>
                  <button className="btn btn-info">COMPARE</button>
                </Link>
                <div>
                  <strong>Without Exchange</strong>
                </div>
                <div>50,999</div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Add an Accessory</strong>
                </div>
                <div>
                  <label>
                    <input type="checkbox"></input>Apple Airpods
                  </label>
                  <br></br>
                  <label>
                    <input type="checkbox"></input>Apple 20W USB Power Adapter
                  </label>
                </div>
                <div>
                  <button
                    className="placeorder__button addtocart"
                    onClick={() => {
                      addcart();
                    }}
                  >
                    Add to Cart
                  </button>

                  <Link to="/checkout">
                    <button className="placeorder__button buynow">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
      <div className="container-t">
        <h2 className="related-title">Products related to this item </h2>
      </div>
      <div className="Products-related1">
        <Slider {...settings}>
          {proloading ? (
            <p className="proloading">
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
      <Footer />
    </div>
  );
}

export default ProductDetail;
