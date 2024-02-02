import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import "./CompareProducts.css";

function CompareProducts() {
  const [proDetail1, setProDetail1] = useState([]);
  const [proDetail2, setProDetail2] = useState([]);

  useEffect(() => {
    getProduct1();
    getProduct2();
    console.log(proDetail1);
    console.log(proDetail2);
  }, []);
  function getProduct1() {
    axios
      .get(
        "https://localhost:7199/api/Product/GetProduct?productId=" +
          localStorage.getItem("CompareProductId_1")
      )
      .then((response) => {
        setProDetail1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  function getProduct2() {
    axios
      .get(
        "https://localhost:7199/api/Product/GetProduct?productId=" +
          localStorage.getItem("CompareProductId_2")
      )
      .then((response) => {
        setProDetail2(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  return (
    <div className="background">
      <Header />
      {proDetail1 != 0 ? <h3 className="m-4">Compare Products</h3> : <h3 className="m-4 text-danger">Please Select Product</h3>}
      <div className="container">
        <div className="row">
          <div className="col-3 m-3 p-3 ">
            <h4 className="title__">
              {proDetail1.title} <strong>VS</strong> {proDetail2.title}
            </h4>
          </div>
          <div className="col-4">
            <div className="image-dis">
              <img
               src={`data:image/jpeg;base64,${proDetail1.imageUrl}`} width={300} />
            </div>            
          </div>
          <div className="image-display">
            <img src={`data:image/jpeg;base64,${proDetail2.imageUrl}`} width={300} />
          </div>
        </div>
      </div>
      <div className="container">      
      <table className="table">
        <thead className="thead-default">
          <tr>
            <th> </th>
            <th>{proDetail1.title}</th>
            <th>{proDetail2.title}</th>
            </tr>
        </thead>
        <tbody>
          <tr className="price">
            <th scope="row">Price</th>
            {/* {products.map(product =>
              <td key={product.id} className="text-center">{product.price}</td>
            )} */}
            <td>${proDetail1.price}</td>
            <td>${proDetail2.price}</td>
          </tr>
          <tr className="brand">
            <th scope="row">Brand</th>
            {/* {products.map(product =>
              <td key={product.id}>
                {product.colors.map((color, index) =>
                  <span key={index} className={"bg-" + color} />
                )}
              </td>
            )} */}
            <td>{proDetail1.brand}</td>
            <td>{proDetail2.brand}</td>
          </tr>
          <tr className="condition">
            <th scope="row">Hightlight</th>
            
            <td>{proDetail1.description}</td>
            <td>{proDetail2.description}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default CompareProducts;
