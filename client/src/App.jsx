import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AuthLayer from "./page/AuthLayer";
import Login from "./page/Auth/Login";
import Signin from "./page/Auth/Signin";
import ShopingLayer from "./page/ShopingLayer";
import Home from "./page/Shoping/Home";
import Nofound from "./page/No found/Nofound";
import DashboardShoping from "./page/Shoping/DashboardShoping";
import CheckOut from "./page/Shoping/CheckOut";
import Listing from "./page/Shoping/Listing";
import AdminLayer from "./page/AdminLayer";
import DashboardAdmin from "./page/Admin/DashboardAdmin";
import Featured from "./page/Admin/Featured";
import Order from "./page/Admin/Order";
import Product from "./page/Admin/Product";
import CheckAuth from "./component/Authnticatin_checker/CheckAuth";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {CheckAuths} from './app/Store/UserAuth'
function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(CheckAuths());
  }, [dispatch]);

  console.log(loading, user, isAuthenticated, location.pathname);

  if (!location.pathname.startsWith("/auth") && loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <AuthLayer />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signin />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <ShopingLayer />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="shopping_dashboard" element={<DashboardShoping />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="listing" element={<Listing />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <AdminLayer />
            </CheckAuth>
          }
        >
          <Route path="admin_dashboard" element={<DashboardAdmin />} />
          <Route path="features" element={<Featured />} />
          <Route path="orders" element={<Order />} />
          <Route path="products" element={<Product />} />
        </Route>

        <Route path="*" element={<Nofound />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
