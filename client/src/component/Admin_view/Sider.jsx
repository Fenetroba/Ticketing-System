import React, { useState } from "react";
import leftArrow from "../../assets/arrow-left.png";
import rightArrow from "../../assets/arrow.png";
import "../Admin_view/styles/sider.css";
import {
  RiAdminLine,
  RiDashboardHorizontalLine,
  RiOrderPlayLine,
  RiProductHuntFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Admin_menu = [
  { id: 1, Label: "DashBoard", icon: <RiDashboardHorizontalLine />, path:'/admin/admin_dashboard' },
  { id: 2, Label: "Order", icon: <RiOrderPlayLine /> ,path:"/admin/orders"},
  { id: 3, Label: "Product", icon: <RiProductHuntFill />,path:'/admin/products' },
];

const Sider = () => {
  const NAvigation=useNavigate()
  const [sideButton, setSideButton] = useState(false);
  const SiderHandler = () => {
    setSideButton(!sideButton);
  };
  return (
    <div className="topContenetr">
      <div className={sideButton ? "active" : "inactive"}>
        <div className="sider_contener">
          <p className="sider_arrow" onClick={SiderHandler}>
            {sideButton ? (
              <img
                src={leftArrow}
                alt="leftArrow"
                style={{ width: "30px" }}
                className="leftArrow"
              />
            ) : (
              <img
                src={rightArrow}
                alt="rightArrow"
                style={{ width: "24px" }}
                className="rightArrow"
              />
            )}
          </p>
        <div className="admin_sider_contener">
          {Admin_menu.map((AdminMenu) => (
            <div className="adminMenu_contener" key={AdminMenu.id} onClick={()=>NAvigation(AdminMenu.path)}>
              <div className="admin_contener">
                <span>{AdminMenu.icon}</span>
                <span>{AdminMenu.Label}</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sider;
