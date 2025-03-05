import React from 'react'
import ticket from "../../assets/ticket.png";
import "../User/navigation.css"
import LogOut from "../../assets/logOut.png";
import {useDispatch}from 'react-redux'
import { logoutUser } from "../../app/Store/UserAuth.js";
import { useNavigate } from "react-router-dom";
const NavBar = () => {

     const Navigat=useNavigate()
      const Dispatch =useDispatch()
      const LogoutHandler=()=>{
        Dispatch(logoutUser())
       
      }
  return (
    <div>
      <div className="d-flex w-100 justify-content-between   UserLAyerTop  position-fixed top-0 ">
      <div className="header_right_side d-flex align-items-center  gap-2">
      <img
          src={ticket}
          alt="ticket"
          style={{ width: "50px", height: "50px" }}
        />
        <h2 className='sm-'>Ticketing System</h2>
      </div>

        <div className="header_left_side">
          <h1 className="logout_buttons" onClick={LogoutHandler}>
            <span> logOut</span>
            <img src={LogOut} alt="logouticons" style={{ width: "30px" }} />
          </h1>
        </div>
      </div>
    </div>
  )
}

export default NavBar