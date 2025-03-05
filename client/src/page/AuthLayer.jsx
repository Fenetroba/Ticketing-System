
import "./auth/Css/AuthLayer.css";
import logo from "../assets/Logo.png";
import { RiArrowDownSFill } from "react-icons/ri";

import { Outlet } from "react-router-dom";

const AuthLayer = () => {
  return (
    <div className="Allconten">
      <div className="main_auth_contener">
        <h1>Welcome To Support Ticketing System</h1>

        <span className="goldeDecor text-black">
        

        </span>
      </div>
  <Outlet/>
     
    </div>
  );
};

export default AuthLayer;
