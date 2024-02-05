// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ROUTES from "../navigation/Router";
// function Header() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ role: null });
//   useEffect(() => {
//     let role = localStorage.getItem("role");
//    setUser({ role: role });
//   }, []);

//   function renderButton() {
//     if (user?.role) {
//       return (
//         <div>
//             <Link onClick={() => {
//               localStorage.clear();
//             }} to={ROUTES.login.name}>Logout</Link>

//         </div>
//       );
//     } else {
//       return (
//         <div>
//               <Link to={ROUTES.login.name}>Login</Link>
//               <Link to={ROUTES.signup.name}>Sign up</Link>
//         </div>
//       );
//     }
//   }
//   function renderMenu(){
//     if(user?.role == "Admin")
//     {return (
//       <div class="topnav">
//       <div className="row">
//         <div className="col-10">
//           <Link to={ROUTES.home.name} class="active">
//             Home
//           </Link>
//           <Link to={ROUTES.contact.name}>Contact</Link>
//           <Link to={ROUTES.about.name}>About</Link>
//           <Link to={ROUTES.product.name}>Products</Link>
//         </div>
//         <div className="col-2">
//           <div class="text-center">
//             {renderButton()}
//           </div>
//         </div>
//       </div>
//     </div>
//     )}
//     else
//     {return (
//       <div class="topnav">
//       <div className="row">
//         <div className="col-10">
//           <Link to={ROUTES.home.name} class="active">
//             Home
//           </Link>
//           <Link to={ROUTES.contact.name}>Contact</Link>
//           <Link to={ROUTES.about.name}>About</Link>
//           {/* <Link to={ROUTES.customer.name}>Customers</Link> */}
//         </div>
//         <div className="col-2">
//           <div class="text-center">
//             {renderButton()}
//           </div>
//         </div>
//       </div>
//     </div>
//     )
//     }
//   }
//   return (
//     <div>
//      {renderMenu()}
//     </div>
//   );
// }

// export default Header;

import React, { useEffect, useState } from "react";
import "./Header.css";
import images from "./images/amazon.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, Routes, useNavigate } from "react-router-dom";
import ROUTES from "../navigation/Router";
import Home from "../containers/home/Home";
import { SearchBar } from "../containers/home/searchBar/SearchBar";
import { SearchResultsList } from "../containers/home/searchResultsList/SearchResultsList";
import Search from "../containers/home/Search/Search";
import { useSelector } from "react-redux";
import { FaWeight } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ role: null, name: null });
  const count = useSelector((state) => state.counter.value)
  useEffect(() => {
    let role = localStorage.getItem("role");
    let name = localStorage.getItem("Name");
    setUser({ name: name, role: role });
    console.log(results);
  }, []);

  const [results, setResults] = useState([]);

  return (
    <div>
      <div className="header">
        <Link to={ROUTES.home.name}>
          <img className="header__logo" src={images} />
        </Link>

         <div className="header__search">  
          <div className="rounded-textbox">
          <SearchBar setResults={setResults} />          
          </div>
        </div>

        <div className="header__nav">
          {user?.role ? (
            <div className="header__option">
              <span className="header__optionLineOne" >Hello, {user.name}</span>
              <Link
                className="header__optionLineTwo"
                onClick={() => {
                  localStorage.clear();
                }}
                to={ROUTES.login.name}
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="header__option">
              <span className="header__optionLineOne">Hello Guest</span>
              <Link className="header__optionLineTwo" to={ROUTES.login.name}>
                Sign In
              </Link>
            </div>
          )}

          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>

          <div className="header__optionBasket">
            <Link className="basket" to={ROUTES.Cart.name}>
            <ShoppingCartIcon/>
            </Link>
            {localStorage.getItem("cartLength")}
           {/* {count} */}
            <span className="header__basketCount"></span>
          </div>
        </div>
      </div>
      
      {/* <div class="header1">
        <div class="container container-header">
          <div className="header__nav">
            <div className="header__option">
              <span className="header__optionLineTwo">All Orders</span>
            </div>
            <div className="header__option">
              <span className="header__optionLineTwo">Mobile</span>
            </div>
            <div className="header__option">
              <span className="header__optionLineTwo">Home & Kitchen</span>
            </div>
            <div className="header__option">
              <span className="header__optionLineTwo">Electronic</span>
            </div>
          </div>
        </div>
      </div> */}
      <nav class="nav">
        <div class="container container-nav">
          <ul className="ul">
            <li class="border-white">
              <Link to={ROUTES.allProducts.name}>All</Link>
            </li>
            <li class="border-white">
              <Link to={ROUTES.allMobile.name}>Mobile</Link>
            </li>
            <li class="border-white">
              <Link to={ROUTES.allElectronic.name}>Electronic</Link>
            </li>
            <li class="border-white">
              <Link to={ROUTES.allHomeKitchen.name}>Home & Kitchen</Link>
             
            </li>
          </ul>

        </div>
      </nav>
      <div>
          {<SearchResultsList results={results} />}
            </div>
    </div>
  );
}
export default Header;

// import React, { useEffect, useState } from "react";
// import "./Header.css";
// import images from "./images/amazon.png";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Link } from "react-router-dom";
// import ROUTES from "../navigation/Router";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ role: null });

//   return (
//     <div>
//       <div className="header">
//         <Link to={ROUTES.home.name}>
//           <img className="header__logo" src={images} />
//         </Link>

//         <div className="header__search">
//           <input className="rounded-textbox" type="text" />
//           <SearchIcon className="header__searchIcon" />
//         </div>

//         <div className="header__nav">
//           {user?.role ? (
//             <div className="header__option">
//               <span className="header__optionLineOne">Hello Guest</span>
//               <Link className="header__optionLineTwo" to={ROUTES.login.name}>
//                 Sign In
//               </Link>
//             </div>
//           ) : (
//             <div className="header__option">
//               <span className="header__optionLineOne">Hello Guest</span>
//               <Link
//                 className="header__optionLineTwo"
//                 to={ROUTES.login.name}
//                 onClick={() => navigate(ROUTES.login.name)} // Call navigate inside onClick event
//               >
//                 Sign In
//               </Link>
//             </div>
//           )}
//           <div className="header__option">
//             <span className="header__optionLineOne">Returns</span>
//              <span className="header__optionLineTwo">& Orders</span>
//            </div>

//            <div className="header__optionBasket">
//              <ShoppingCartIcon />
//              <span className="header__basketCount">0</span>
//            </div>
//         </div>
//       </div>
//       <nav class="nav">
//          <div class="container container-nav">
//            <ul className="ul">
//              {/* <li class="border-white" id="open-nav-sidebar">
//                      <span class="open-nav-slider">
//                          <i class="fa-solid fa-bars"></i>
//                          All
//                      </span>
//                  </li> */}
//              <li class="border-white">
//                {/* <Link to={navigate(ROUTES.login.name)}>All</Link> */}
//              </li>
//              <li class="border-white">
//                <a href="#">Mobiles</a>
//              </li>
//              <li class="border-white">
//                <a href="#">Electronic</a>
//              </li>
//              <li class="border-white">
//                <a href="#">Home & Kitchen</a>
//              </li>
//            </ul>
//            {/* <div class="nav-right-image-amazon-prime">
//                  <img
//                      src="https://m.media-amazon.com/images/G/31/img17/Home/AmazonTV/Ravina/Desktop/Watch-Entertainment-for-FREE_400-x39._CB605460886_.jpg" />
//              </div> */}
//          </div>
//        </nav>
//     </div>
//   );
// }

// export default Header;
