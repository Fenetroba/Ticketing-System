import React from "react";
import { Outlet } from "react-router-dom";
import Nav from '../component/User/NavBar'
import '../page/PageCss/userlayer.css'
const ShopingLayer = () => {

 
  return (
    <div>
      <Nav />

      <div className="UserLayer">

      </div>
      <Outlet />
    </div>
  );
};

export default ShopingLayer;
