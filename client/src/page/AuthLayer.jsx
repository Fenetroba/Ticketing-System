
import "./auth/Css/AuthLayer.css";
import logo from "../assets/Logo.png";
import { RiArrowDownSFill } from "react-icons/ri";
import Signup from "./auth/Signin";


import Login from "./auth/Login.jsx";
import { Outlet } from "react-router-dom";

const AuthLayer = () => {
  return (
    <div className="Allconten">
      <div className="main_auth_contener">
        <h1>wellcome Ticketing System</h1>

        <span className="goldeDecor">
          <img src={logo} alt="Logo" />
        </span>
      </div>
  <Outlet/>
     
    </div>
  );
};

export default AuthLayer;
