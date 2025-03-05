import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTickets, createTicket } from "../../app/Store/tickets";
import TicketForm from "./TicketForm";
import Sidebar from "../User/UserSider"; // Import the Sidebar component
import LoadPage from "../loder/PageLoder.jsx";
import { RiArrowDownCircleLine, RiUser2Fill } from "react-icons/ri";


const UserDashboard = () => {
  const dispatch = useDispatch();
  const { tickets, error, loading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.Auth);
  const [showTickets, setShowTickets] = useState(false); // State to toggle ticket visibility
  const [showTicketForm, setShowTicketForm] = useState(false); // State to toggle ticket form visibility
  const [selectedTicket, setSelectedTicket] = useState(null); // State to hold the selected ticket

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    dispatch(fetchUserTickets(token)); // Fetch user tickets when the component mounts
  }, [dispatch]);

  const handleCreateTicket = async (ticketData) => {
    const token = localStorage.getItem("token");
    dispatch(createTicket({ ticketData, token })); // Dispatch createTicket action
    setShowTicketForm(false); // Hide the form after creating a ticket
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets); // Toggle ticket visibility
  };

  const toggleTicketForm = () => {
    setShowTicketForm(!showTicketForm); // Toggle ticket form visibility
  };

  const handleDescriptionClick = (ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket
  };

  return (
    <div className="container mt-4  bg-body-secondary p-4 w-100 h-auto">
      <h2 className="my-4">
        My Dashboard <RiUser2Fill />
      </h2>
   
        <strong>User Email: </strong>
        {user.email}
    
  
      <Sidebar
        onToggleTickets={toggleTickets}
        onToggleTicketForm={toggleTicketForm}
        showTickets={showTickets}
        showTicketForm={showTicketForm}
      />
      {loading && <LoadPage />}{" "}
      {/* Show loading message while fetching tickets */}
      {error && (
        <p className="text-danger">Check Your internet connection</p>
      )}{" "}
      {/* Show error message if there's an error */}
      {showTickets && (
        <>
          <h3 className="my-3">Tickets</h3>
          {tickets.length === 0 ? (
            <p>No tickets available.</p> // Message when no tickets are available
          ) : (
            <ul className="list-group mb-4">
              {tickets.map((ticket) => (
                <li key={ticket._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <strong>Subject:</strong> {ticket.title}
                    </div>
                    <span
                      className={`badge ${
                        ticket.status === "Closed"
                          ? "bg-danger"
                          : ticket.status === "In Progress"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong>Description:</strong>{" "}
                    <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleDescriptionClick(ticket)} // Handle click event
                    >
                      <RiArrowDownCircleLine />
                    </span>
                  </div>
                  <div className="mt-1">
                    <strong>Created At:</strong>{" "}
                    {new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {showTicketForm && (
        <div>
          <h3 className="my-3">Create New Ticket</h3>
          <TicketForm onSubmit={handleCreateTicket} />{" "}
          {/* Render the TicketForm component */}
        </div>
      )}
      {selectedTicket && (
        <div className="mt-4 bg-light p-3">
          <p>
            <strong>Description:</strong>
            <br /> {selectedTicket.description}
          </p>

          <button
            className="btn btn-secondary"
            onClick={() => setSelectedTicket(null)} // Clear selected ticket
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
