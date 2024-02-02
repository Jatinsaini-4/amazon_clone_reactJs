import React, { useMemo, useState } from "react";
import Header from "../../../components/Header";
import { useEffect } from "react";
import $, { event } from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/Table1";
import api from "../../Api";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Customer() {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    imageFile: null,
    pincode: "",
    countryId: 0,
    stateId: 0,
    cityId: 0,
  });
  const [fromError, setFormError] = useState({
    name: "",
    email: "",
    address: "",
    imageFile: null,
    pincode: "",
    country: "",
    state: "",
    city: "",
  });
  const [CustomerId, setCustomerId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({ name: "" });
  const saveMessage = () => toast.success("Data Saved");
  const updateMessage = () => toast.success("Data Updated");
  const deleteMessage = () => toast.success("Data Deleted");

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ cell: { value } }) => (
          <img
            className="card-img-top"
            src={`data:image/jpeg;base64,${value}`}
            height="100"
            alt="Student Image"
          />
        ),
      },
      {
        Header: "Pincode",
        accessor: "pincode",
      },
      {
        Header: "Country",
        accessor: "city.state.country.name",
      },
      {
        Header: "State",
        accessor: "city.state.name",
      },
      {
        Header: "City",
        accessor: "city.name",
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
                setCustomerId(row.original.id);
                // setSelectedCity(row.original.city.id);
                // setSelectedCountry(row.original.city.state.country.id);
                // setSelectedState(row.original.city.state.id);
                setForm({
                  ...form,
                  name: row.original.name,
                  address: row.original.address,
                  email: row.original.email,
                  pincode: row.original.pincode,
                  imageFile: row.original.imageUrl,
                  countryId: row.original.city.state.country.id,
                  stateId: row.original.city.state.id,
                  cityId: row.original.city.id,
                });
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteCustomer(row.original.id);
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
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role == null) navigate(ROUTES.login.name);
    else {
      getAll();
      api.get("https://localhost:7199/api/Country").then((response) => {
        setCountries(response.data);
      });
    }
  }, []);

  const [imageData, setImageData] = useState({
    base64textString: "",
    imageName: "",
    showImage: false,
  });

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

  function getAll() {
    api.get("https://localhost:7199/api/Customer").then((d) => {
      setCustomers(d.data);
      // setData(d.data);
    });
  }

  const GetStatesByCountry = (e) => {
    setSelectedCountry(e.target.value);
    api
      .get(
        `https://localhost:7199/api/State/GetStatesByCountry?countryId=${e.target.value}`
      )
      .then((response) => {
        setStates(response.data);
        setForm({ ...form, [e.target.name]: e.target.value });
      });
  };

  const GetCitiesByState = (e) => {
    setSelectedState(e.target.value);
    // Fetch cities based on the selected state
    api
      .get(
        `https://localhost:7199/api/City/GetCitiesByState?stateId=${e.target.value}`
      )
      .then((response) => {
        setCities(response.data);
        setForm({ ...form, [e.target.name]: e.target.value });
      });
  };

  const CityChange = (e) => {
    setSelectedCity(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function deleteCustomer(id) {
    try {
      api.delete(`https://localhost:7199/api/Customer/${id}`).then((d) => {
        getAll();
        deleteMessage();
      });
    } catch (error) {}
  }

  function saveCustomer() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("address", form.address);
      formData.append("imageFile", form.imageFile, form.imageFile.name);
      formData.append("pincode", form.pincode);
      // formData.append("countryId", form.countryId);
      // formData.append("stateId", form.stateId);
      formData.append("cityId", form.cityId);
      api
        .post("https://localhost:7199/api/Customer", formData, {
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
  const Countrychange = (e) => {
    setSelectedCountry(event.target.value);
  };

  function resetForm() {
    setCustomerId(null);
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setForm({
      name: "",
      email: "",
      address: "",
      pincode: "",
      imageFile: null,
      cityId: 0,
      countryId: 0,
      stateId: 0,
    });
  }
  function uploadimage() {
    <img
      src={imageData.base64textString}
      alt={imageData.imageName}
      className="card-img-top"
      height="200"
      width="50"
    />;
  }
  function imagecustomer() {
    return (
      <img
        className="card-img-top"
        src={`data:image/jpeg;base64,${form.imageFile}`}
        height="200"
        width="50"
        alt="Image Selected"
      />
    );
  }
  function updateCustomer() {
    try {
      const formData = new FormData();
      formData.append("id", CustomerId);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("address", form.address);
      formData.append("imageFile", form.imageFile, form.imageFile.name);
      formData.append("pincode", form.pincode);
      formData.append("countryId", selectedCountry);
      formData.append("stateId", selectedState);
      formData.append("cityId", selectedCity);
      api
        .put(`https://localhost:7199/api/Customer/${CustomerId}`, formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          Swal.fire({
            icon: "success",
            title: "Data Updated",
            text: "Your data has been Update successfully.",
          });
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Fail to submit data");
    }
  }
  // function renderCustomer() {
  //   return customers?.map((item) => {
  //     return (
  //       <tr>
  //         <td>{item.name}</td>
  //         <td>{item.email}</td>
  //         <td>{item.address}</td>
  //         {
  //           <td>
  //             <img
  //               src={`data:image/jpeg;base64,${item.imageUrl}`}
  //               height="100"
  //               width="100"
  //               alt="Customer Image"
  //             />
  //           </td>
  //         }
  //         <td>{item.pincode}</td>
  //         <td>{item.city.state.country.name}</td>
  //         <td>{item.city.state.name}</td>
  //         <td>{item.city.name}</td>
  //         <td>
  //           <button
  //             onClick={() => {
  //               deleteCustomer(item.id);
  //             }}
  //             className="btn btn-danger"
  //           >
  //             Delete
  //           </button>
  //         </td>
  //         <td>
  //           <button
  //             data-toggle="modal"
  //             data-target="#newModal"
  //             onClick={() => {
  //               setCustomerId(item.id);
  //               setSelectedCity(item.city.id);
  //               setSelectedCountry(item.city.state.country.id);
  //               setSelectedState(item.city.state.id);
  //               setForm({
  //                 ...form,
  //                 name: item.name,
  //                 address: item.address,
  //                 email: item.email,
  //                 pincode: item.pincode,
  //                 imageFile: item.imageFile,
  //                 countryId: item.city.state.country.id,
  //                 stateId: item.city.state.id,
  //                 cityId: item.city.id,
  //               });
  //             }}
  //             className="btn btn-info"
  //           >
  //             Edit
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }
  return (
    <div>
      <div></div>
      <Header />

      <div class="row m-2 p-2">
        <div class="col-9">
          <h2 class="text-primary mx-auto">Customer List</h2>
        </div>
        <div class="col-3">
          <button
            class="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            Add New Customer
          </button>
        </div>
        <div class="modal" id="newModal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-primary">
                <h5 class="modal-title text-white">
                  {CustomerId ? "Edit Customer" : "New Customer"}
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
                  <label for="txtname" class="col-sm-4">
                    Name
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      id="txtname"
                      value={form.name}
                      onChange={changeHandler}
                      class="form-control"
                      placeholder="Enter Name"
                      name="name"
                    />
                    {/* <p className="text-danger">{fromError.name}</p> */}
                  </div>
                </div>

                <div class="form-group row">
                  <label for="txtaddress" class="col-sm-4">
                    Address
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      id="txtaddress"
                      value={form.address}
                      onChange={changeHandler}
                      class="form-control"
                      placeholder="Enter Address"
                      name="address"
                    />
                    {/* <p className="text-danger">{fromError.address}</p> */}
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtemail" class="col-sm-4">
                    Email
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      id="txtemail"
                      onChange={changeHandler}
                      class="form-control"
                      placeholder="Enter Email"
                      name="email"
                      value={form.email}
                    />
                    {/* <p className="text-danger">{fromError.email}</p> */}
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtPincode" class="col-sm-4">
                    Pincode
                  </label>
                  <div class="col-sm-8">
                    <input
                      type="number"
                      id="txtPincode"
                      class="form-control"
                      onChange={changeHandler}
                      placeholder="Enter Pincode"
                      name="pincode"
                      value={form.pincode}
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
                  {/* <div>
                    <img
                      src={imageData.base64textString}
                      alt={imageData.imageName}
                      className="card-img-top"
                      height="200"
                      width="50"
                    />
                  </div> */}
                </div>
                <div class="form-group row">
                  <label for="countryId" className="col-sm-4">
                    Country
                  </label>
                  <div class="col-sm-8">
                    <select
                      value={selectedCountry}
                      name="countryId"
                      class="form-control"
                      onChange={GetStatesByCountry}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="stateid" className="col-sm-4">
                    State
                  </label>
                  <div class="col-sm-8">
                    <select
                      value={selectedState}
                      name="stateId"
                      class="form-control"
                      onChange={GetCitiesByState}
                    >
                      <option value="">Select State</option>
                      {states.map((states) => (
                        <option key={states.id} value={states.id}>
                          {states.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="cityid" className="col-sm-4">
                    City
                  </label>
                  <div class="col-sm-8">
                    <select
                      value={selectedCity}
                      name="cityId"
                      class="form-control"
                      onChange={CityChange}
                    >
                      <option value="">Select City</option>
                      {cities.map((cities) => (
                        <option key={cities.id} value={cities.id}>
                          {cities.name}
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
                    if (CustomerId) {
                      updateCustomer();
                      updateMessage();
                    } else {
                      saveCustomer();
                      saveMessage();
                    }
                  }}
                >
                  {CustomerId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border p-2 m-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Image</th>
                <th>Pincode</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderCustomer()}</tbody>
          </table>
        </div> */}
      </div>
      <div className="table table-borderd text-center">
        <Table columns={columns} paging={true} data={customers} />
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default Customer;
