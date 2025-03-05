import React from "react";
import { Outlet } from "react-router-dom";
import Nav from '../component/User/NavBar'
import UserDashboard from "../component/User/UserDashboard";
const ShopingLayer = () => {

 
  return (
    <div>
      <Nav />
      <UserDashboard/>

      <div className="UserLayer">

      </div>
      <Outlet />
    </div>
  );
};

export default ShopingLayer;
