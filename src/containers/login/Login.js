// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import ROUTES from "../../navigation/Router";
// import Header from "../../components/Header";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const loginError = () => toast.error("Wrong username / password!");
//   const loginMessage = () => toast.success("Successfully logged in");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({
//       ...form,[e.target.name]: e.target.value,

//     });

//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://localhost:7199/api/Authenticate/login", form);
//       const { token, refreshToken, role,userName } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("role", role);
//       localStorage.setItem("userName", userName);
//       loginMessage();
//       navigate(ROUTES.product.name);
//     } catch (error) {
//       loginError();
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <section className="vh-100 gradient-custom">
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//               <div className="card bg-dark text-white">
//                 <div className="card-body p-5 text-center">
//                   <div className="mb-md-5 mt-md-4 pb-5">
//                     <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//                     <p className="text-white-50 mb-5">
//                       Please enter your login and password!
//                     </p>
//                     <div className="form-outline form-white mb-4">
//                       <input
//                         type="text"
//                         name="username"
//                         value={form.username}
//                         onChange={handleChange}
//                         className="form-control form-control-lg"
//                       />
//                       <label className="form-label" htmlFor="Username">
//                         Username
//                       </label>
//                     </div>
//                     <div className="form-outline form-white mb-4">
//                       <input
//                         type="password"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="form-control form-control-lg"
//                       />
//                       <label className="form-label" htmlFor="password">
//                         Password
//                       </label>
//                     </div>
//                     <p className="small mb-5 pb-lg-2">
//                       <a className="text-white-50" href="#!">
//                         Forgot password?
//                       </a>
//                     </p>
//                     <button
//                       className="btn btn-outline-light btn-lg px-5"
//                       type="submit"
//                       onClick={handleSubmit}
//                     >
//                       Login
//                     </button>
//                   </div>
//                   <div>
//                     <p className="mb-0">
//                       Don't have an account?
//                       <Link to={ROUTES.signup.name}>Sign Up</Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </section>

//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../navigation/Router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginError = () => toast.error("Wrong username / password!");
  const loginMessage = () => toast.success("Successfully logged in");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7199/api/Authenticate/login",
        form
      );
      const { token, refreshToken, role, name,id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("Name", name);
      localStorage.setItem("applicationUserId", id);
      toast.success("Login Successfully done !");
      navigate(ROUTES.home.name);
    } catch (error) {
      loginError();
    }
  };

  return (
    <div>
      <Header />
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img
              src="https://logo-logos.com/2016/12/Amazon_logo.png"
              alt="signupimg"
            />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="At least 6 characters"
                />
              </div>
              <button
                type="submit"
                className="signin_btn"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <button>
              <Link to={ROUTES.signup.name}>Create your Account</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
