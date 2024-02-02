import About from "../containers/about/About";
import Contact from "../containers/contact/Contact";
import Customer from "../containers/admin/customer/Customer";
import Home from "../containers/home/Home";
import Login from "../containers/login/Login";
import Product from "../containers/admin/product/Product";
import Register from "../containers/Register";
import SignUp from "../containers/signup/SignUp";
import AllMobile from "../containers/category/allMobile/AllMobile";
import AllHomeKitchen from "../containers/category/allHome_Kitchen/AllHome_Kitchen";
import AllElectronic from "../containers/category/allElectronic/AllElectronic";
import AllProducts from "../containers/category/allProducts/AllProducts";
import Detail from "../containers/home/productDetail/ProductDetail";
import Search from "../containers/home/Search/Search";
import CompareProducts from "../containers/compareProducts/CompareProducts";
import Cart from "../containers/cart/Cart";
import ProceedBuy from "../containers/cart/ProceedBuy";

const ROUTES={
    register:{
        name:"/register",
        component:<Register/>
    },
    about:{
        name:"/about",
        component:<About/>
    },
    contact:{
        name:"/contact",
        component:<Contact/>
    },
    customer:{
        name:"/customer",
        component:<Customer/>
    },
    home:{
        name:"/",
        component:<Home/>
    },
    login:{
        name:"/login",
        component:<Login/>
    },
    signup:{
        name:"/signup",
        component:<SignUp/>
    },
    product:{
        name:"/product",
        component:<Product/>
    },
    allMobile:{
        name:"/Mobile",
        component:<AllMobile/>
    },
    allHomeKitchen:{
        name:"/Home-Kitchen",
        component:<AllHomeKitchen/>
    },
    allElectronic:{
        name:"/Electronic",
        component:<AllElectronic/>
    },
    allProducts:{
        name:"/Products",
        component:<AllProducts/>
    },
    detail:{
        name:"/detail",
        component:<Detail/>
    },
    SearchResult:{
        name:"/searchResult",
        component:<Search/>
    },
    compareProducts:{
        name:"/compareProducts",
        component:<CompareProducts/>
    },
    Cart:{
        name:"/cart",
        component:<Cart/>
    },
    ProceedBuy:{
        name:"/proceedToBuy",
        component:<ProceedBuy/>
    }
    
}
export default ROUTES;