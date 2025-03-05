import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseFill, RiCreativeCommonsLine, RiEye2Line, RiEyeCloseFill, RiEyeOffFill, RiPencilFill, RiPinDistanceLine, RiSearchEyeLine } from 'react-icons/ri';
import '../User/navigation.css'
const Sidebar = ({ onToggleTickets, onToggleTicketForm, showTickets, showTicketForm }) => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="btn text-light " onClick={toggleSidebar} style={{position:"absolute", right:'0', backgroundColor:'#1d1e1e' }}>
        {isOpen ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <button className="btn mb-3 text-light" onClick={onToggleTickets} style={{backgroundColor:'#1d1e1e'}}>
            {showTickets ? <span>My Tickets <RiEyeCloseFill/></span> : <span >My Tickets <RiEye2Line/></span>}
          </button>
          <button className="btn btn-primary mb-3" onClick={onToggleTicketForm} style={{backgroundColor:'#1d1e1e'}}>
          <span>Create Ticket <RiPencilFill/> </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;