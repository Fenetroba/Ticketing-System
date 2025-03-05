import React from "react";
import "../Admin_view/styles/header.css";
import LogOut from "../../assets/logout.png";
import {useDispatch}from 'react-redux'
import { logoutUser } from "../../app/Store/UserAuth.js";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const Navigat=useNavigate()
  const Dispatch =useDispatch()
  const LogoutHandler=()=>{
    Dispatch(logoutUser())
    
   
  }

  return (
    <div className="header">
      <div className="headr_contener">
        <div className="header_right">
          <h1 style={{color:"white",fontSize:'25px',cursor:'pointer'}} onClick={()=>Navigat('/admin/admin_dashboard')}><RiAdminLine style={{fontSize:"30px" }}/> Admin Panal</h1>
        </div>
        <div className="header_left" >
          <h1 className="logout_button" onClick={LogoutHandler}>
      <span>      logOut</span>
            <img src={LogOut} alt="logouticons" style={{ width: "30px" }} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
