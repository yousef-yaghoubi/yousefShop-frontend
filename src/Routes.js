import Header from "./ComponentsPanel/Header/Header";
import ShopingCart from "./ComponentsMain/ShopingCart/ShopingCart";
import HeaderMain from "./ComponentsMain/HeaderMain/HeaderMain";
import Products from "./ComponentsPanel/Products/Products";
import Users from "./ComponentsPanel/Users/Users";
import Comments from "./ComponentsPanel/Comments/Comments";
import Orders from "./ComponentsPanel/Orders/Orders";
import Offers from "./ComponentsPanel/Offers/Offers";
import BodyMain from "./ComponentsMain/BodyMain/BodyMain";
import Sidebar from "./ComponentsPanel/Sidebar/Sidebar";
import Home from "./ComponentsPanel/Home/Home";
import Login from "./Login";
import ShowProduct from "./ComponentsMain/ShowProduct/ShowProduct";
import Profile from "./ComponentsMain/Profile/Profile";
import AllProducts from "./ComponentsMain/AllProducts/AllProducts";


const Routes = [
    {path: "", element: <><HeaderMain /> <BodyMain/></>},
    {path: "/*", element: <><HeaderMain /> <BodyMain/></>},
    {path: "/login", element: <Login/>},
    {path: "/product/*", element: <ShowProduct/>},
    {path: "/products/*", element: <AllProducts/>},
    {path: "/profile", element: <Profile/>},
    {path: "/shopingCart", element: <div><HeaderMain/><ShopingCart/></div>},
    {path: "/panel//", element: <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Home/></div></div>},

    {path: "/panel/products", element:  <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Products/></div></div>},   
    {path: "/panel/users", element:  <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Users/></div></div>},
    {path: "/panel/comments", element:  <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Comments/></div></div>},
    {path: "/panel/orders", element:  <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Orders/></div></div>},
    {path: "/panel/offers", element:  <div className="flex justify-between"><Sidebar /><div className=" w-full px-2"><Header /><Offers/></div></div>}
];

export default Routes;