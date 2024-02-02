import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import api from "../../Api";
import Table from "../../../components/Table1";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const [Products, setProducts] = useState([]);
  const [selectedcategories, setSelectedCategories] = useState(null);
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    listPrice: 0,
    price: 0,
    imageFile: null,
    productCategoryId: 0,
  });
  const [imageData, setImageData] = useState({
    base64textString: "",
    imageName: "",
    showImage: false,
  });
  const [ProductId, setProductId] = useState(null);
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "ListPrice",
        accessor: "listPrice",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ cell: { value } }) => (
          <img
            className="card-img-top"
            src={`data:image/jpeg;base64,${value}`}
            height="100"
            alt="Product Image"
          />
        ),
      },
      {
        Header: "ProductCategory",
        accessor: "productCategory.name",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <button
              className="btn btn-info m-1"
              data-toggle="modal"
              data-target="#newModal"
              onClick={() => {
                setProductId(row.original.id);
                setSelectedCategories(row.original.productCategory.id);
                setForm({
                  ...form,
                  title: row.original.title,
                  brand: row.original.brand,
                  description: row.original.description,
                  listPrice: row.original.listPrice,
                  price: row.original.price,
                  imageFile: row.original.imageUrl,
                  productCategoryId: row.original.productCategory.id,
                });
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteProduct(row.original.id);
              }}
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAll();
    api.get("https://localhost:7199/api/ProductCategory").then((response) => {
      setCategories(response.data);
      console.log(Products);
    });
  }, []);
  const convertToBase64 = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, imageFile: file });

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageData({
        base64textString: reader.result,
        imageName: file.name,
        showImage: true,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  function saveProduct() {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("brand", form.brand);
      formData.append("description", form.description);
      formData.append("listPrice", form.listPrice);
      formData.append("price", form.price);
      formData.append("imageFile", form.imageFile, form.imageFile.name);
      formData.append("productCategoryId", form.productCategoryId);
      api
        .post("https://localhost:7199/api/Product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Failed to submit data");
    }
  }

  function updateProduct() {
    try {
      const formData = new FormData();
      formData.append("id", ProductId);
      formData.append("title", form.title);
      formData.append("brand", form.brand);
      formData.append("description", form.description);
      formData.append("listPrice", form.listPrice);
      formData.append("price", form.price);
      formData.append("imageFile", form.imageFile, form.imageFile.name);
      formData.append("productCategoryId", form.productCategoryId);
      api
        .put(`https://localhost:7199/api/Product/${ProductId}`, formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Fail to submit data");
    }
  }
  const GetProductCategories = (e) => {
    setSelectedCategories(e.target.value);
    api.get("https://localhost:7199/api/ProductCategory").then((response) => {
      setCategories(response.data);
      setForm({ ...form, [e.target.name]: e.target.value });
    });
  };

  function getAll() {
    api.get("https://localhost:7199/api/Product").then((d) => {
      setProducts(d.data);
    });
  }
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function resetForm() {
    setProductId(null);
    setForm({
      title: "",
      brand:"",
      description: "",
      listPrice: "",
      price: "",
      imageFile: null,
      productCategoryId: 0,
    });
  }
  const saveMessage = () => toast.success("Data Saved");
  const updateMessage = () => toast.success("Data Updated");
  const deleteMessage = () => toast.success("Data Deleted");
  const navigate = useNavigate();

  function deleteProduct(id) {
    try {
      api.delete(`https://localhost:7199/api/Product/${id}`).then((d) => {
        getAll();
        deleteMessage();
      });
    } catch (error) {}
  }

  function getAll() {
    api.get("https://localhost:7199/api/Product").then((d) => {
      setProducts(d.data);
      console.log(Products);
    });
  }
  return (
    <div>
      <Header />
      <div class="row m-2 p-2">
        <div class="col-9">
          <h2 class="text-primary ">Product List</h2>
        </div>
        <div class="col-3">
          <button
            class="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            Add New Product
          </button>
        </div>
      </div>
      <div class="modal" id="newModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-white">
                {ProductId ? "Edit Product" : "New Product"}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  resetForm();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div class="form-group row">
                <label for="txttitle" class="col-sm-4">
                  Title
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    id="txttitle"
                    onChange={changeHandler}
                    class="form-control"
                    placeholder="Enter Title"
                    name="title"
                    value={form.title}
                  />
                  {/* <p className="text-danger">{fromError.email}</p> */}
                </div>
              </div>
              <div class="form-group row">
                <label for="txtbrand" class="col-sm-4">
                  Brand
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    id="txtbrand"
                    value={form.brand}
                    onChange={changeHandler}
                    class="form-control"
                    placeholder="Enter Brand"
                    name="brand"
                  />
                  {/* <p className="text-danger">{fromError.address}</p> */}
                </div>
              </div>
              <div class="form-group row">
                <label for="txtdescription" class="col-sm-4">
                  Description
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    id="txtdescription"
                    value={form.description}
                    onChange={changeHandler}
                    class="form-control"
                    placeholder="Enter Description"
                    name="description"
                  />
                  {/* <p className="text-danger">{fromError.address}</p> */}
                </div>
              </div>
              <div class="form-group row">
                <label for="txtlistPrice" class="col-sm-4">
                  ListPrice
                </label>
                <div class="col-sm-8">
                  <input
                    type="number"
                    id="txtlistPrice"
                    onChange={changeHandler}
                    class="form-control"
                    placeholder="Enter ListPrice"
                    name="listPrice"
                    value={form.listPrice}
                  />
                  {/* <p className="text-danger">{fromError.email}</p> */}
                </div>
              </div>
              <div class="form-group row">
                <label for="txtprice" class="col-sm-4">
                  Price
                </label>
                <div class="col-sm-8">
                  <input
                    type="number"
                    id="txtprice"
                    class="form-control"
                    onChange={changeHandler}
                    placeholder="Enter Price"
                    name="price"
                    value={form.price}
                  />
                  {/* <p className="text-danger">{fromError.pincode}</p> */}
                </div>
              </div>
              <div class="form-group row">
                <label for="txtimage" class="col-sm-4">
                  Image
                </label>
                <div className="col-8">
                  <input
                    type="file"
                    class="form-control"
                    id="txtimage"
                    name="imageFile"
                    onChange={convertToBase64}
                  />
                </div>
                {imageData.imageName ? (
                  <img
                    src={imageData.base64textString}
                    alt={imageData.imageName}
                    className="card-img-top"
                    height="200"
                    width="50"
                  />
                ) : (
                  <img
                    className="card-img-top"
                    src={`data:image/jpeg;base64,${form.imageFile}`}
                    height="200"
                    width="50"
                    alt="Select Image"
                  />
                )}
              </div>
              <div class="form-group row">
                <label for="txtproductCategoryId" className="col-sm-4">
                  ProductCategory
                </label>
                <div class="col-sm-8">
                  <select
                    value={selectedcategories}
                    name="productCategoryId"
                    class="form-control"
                    onChange={GetProductCategories}
                  >
                    <option value="">Select Country</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  resetForm();
                }}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  if (ProductId) {
                    updateProduct();
                    updateMessage();
                  } else {
                    saveProduct();
                    saveMessage();
                  }
                }}
              >
                {ProductId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table table-borderd text-center">
        <Table columns={columns} paging={true} data={Products} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Product;
