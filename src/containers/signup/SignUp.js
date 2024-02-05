// import React, { useState } from "react";
// import ROUTES from "../../navigation/Router";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './Signup.css';

// function SignUp() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const RegisterMessage = () => toast.success("successfully registered");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios
//         .post("https://localhost:7199/api/Authenticate/register", form)
//         .then((d) => {
//           RegisterMessage();
//           navigate(ROUTES.login.name);
//         })
//         .catch((e) => {
//           alert("Something went wrong");
//         });
//     } catch (error) {
//       alert("unable to register user");
//     }
//   };
//   return (
//     <div>
//       <ToastContainer />
//       <Header />
//       <section class="vh-10 gradient-custom">
//         <div class="container py-5 h-35">
//           <div class="row d-flex justify-content-center align-items-center h-100">
//             <div class="col-12 col-md-8 col-lg-6 col-xl-5">
//               <div class="card bg-dark text-white">
//                 <div class="card-body p-5 text-center">
//                   <div class="mb-md-5 mt-md-4 pb-5">
//                     <h2 class="fw-bold mb-2 text-uppercase">Create Account</h2>
//                     <p class="text-white-50 mb-5">
//                       Please enter your login and password!
//                     </p>
//                     <div class="form-outline form-white mb-4">
//                       <input
//                         type="text"
//                         name="username"
//                         value={form.username}
//                         onChange={handleChange}
//                         class="form-control form-control-lg"
//                       />
//                       <label class="form-label" for="Username">
//                         Username
//                       </label>
//                     </div>
//                     <div class="form-outline form-white mb-4">
//                       <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         class="form-control form-control-lg"
//                       />
//                       <label class="form-label" for="email">
//                         Email
//                       </label>
//                     </div>
//                     <div class="form-outline form-white mb-4">
//                       <input
//                         type="password"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         class="form-control form-control-lg"
//                       />
//                       <label class="form-label" for="password">
//                         Password
//                       </label>
//                     </div>
//                     <p class="small mb-5 pb-lg-2">
//                       <a class="text-white-50" href="#!">
//                         Forgot password?
//                       </a>
//                     </p>
//                     <button
//                       class="btn btn-outline-light btn-lg px-5"
//                       type="submit"
//                       onClick={handleSubmit}
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                   <div>
//                     <p class="mb-0">
//                     New customer?
//                       <Link to={ROUTES.signup.name}>Start here.</Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// export default SignUp;
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Divider } from '@mui/material'
import './Signup.css';
import { NavLink } from 'react-bootstrap';
import ROUTES from '../../navigation/Router';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function SignUp() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:"",
    email: "",
    streetAddress:"",
    city:"",
    state:"",
    postalCode:"",
    phoneNumber:"",
    password: "",
  });

  const RegisterMessage = () => toast.success("Successfully SignUp");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("https://localhost:7199/api/Authenticate/register", form)
        .then((d) => {
          RegisterMessage();
          navigate(ROUTES.login.name);
        })
        .catch((e) => {
          alert("Something went wrong");
        });
    } catch (error) {
      alert("unable to register user");
    }
  };

  return (
    <div>
      <Header/>
      <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://logo-logos.com/2016/12/Amazon_logo.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name'
                            onChange={handleChange}
                            value={form.name}                             
                                id="name" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={handleChange}
                                value={form.email}
                                id="email" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="StreetAddress">Street Address</label>
                            <input type="text" name="streetAddress"
                                onChange={handleChange}
                                value={form.streetAddress}
                                id="StreetAddress" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="City">City</label>
                            <input type="text" name="city"
                                onChange={handleChange}
                                value={form.city}
                                id="City" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="State">State</label>
                            <input type="text" name="state"
                                onChange={handleChange}
                                value={form.state}
                                id="State" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text" name="postalCode"
                                onChange={handleChange}
                                value={form.postalCode}
                                id="postalCode" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber"
                                onChange={handleChange}
                                value={form.phoneNumber}
                                id="PhoneNumber" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                            onChange={handleChange}
                            value={form.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        {/* <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="password" name="cpassword"
                                // onChange={handleChange}
                                // value={form.cpassword}
                                id="passwordg" />
                        </div> */}
                        <button type="submit" className="signin_btn"
                         onClick={handleSubmit}
                        >Continue</button>

                        <Divider />

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <Link to={ROUTES.login.name}>Sign in</Link>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    </div>
  )
}

export default SignUp