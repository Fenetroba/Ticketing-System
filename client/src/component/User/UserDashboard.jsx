import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTickets, createTicket } from '../../app/Store/tickets';
import TicketForm from './TicketForm';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { tickets, error, loading } = useSelector((state) => state.tickets);
  const [showTickets, setShowTickets] = useState(false); // State to toggle ticket visibility
  const [showTicketForm, setShowTicketForm] = useState(false); // State to toggle ticket form visibility

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    dispatch(fetchUserTickets(token)); // Fetch user tickets when the component mounts
  }, [dispatch]);

  const handleCreateTicket = async (ticketData) => {
    const token = localStorage.getItem('token');
    dispatch(createTicket({ ticketData, token })); // Dispatch createTicket action
    setShowTicketForm(false); // Hide the form after creating a ticket
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets); // Toggle ticket visibility
  };

  const toggleTicketForm = () => {
    setShowTicketForm(!showTicketForm); // Toggle ticket form visibility
  };

  return (
    <div className="container">
      <h2 className="my-4">User Dashboard</h2>
      
      <button className="btn btn-info mb-3" onClick={toggleTickets}>
        {showTickets ? 'Hide My Tickets' : 'My Tickets'}
      </button>

      <button className="btn btn-primary mb-3 ms-2" onClick={toggleTicketForm}>
        {showTicketForm ? 'Cancel' : 'Create Ticket'}
      </button>

      {loading && <p className="text-info">Loading your tickets...</p>} {/* Show loading message while fetching tickets */}
      {error && <p className="text-danger">{error}</p>} {/* Show error message if there's an error */}

      {showTickets && (
        <>
          <h3 className="my-3">Your Tickets</h3>
          {tickets.length === 0 ? (
            <p>No tickets available.</p> // Message when no tickets are available
          ) : (
            <ul className="list-group mb-4">
              {tickets.map(ticket => ( // Map over the fetched tickets to display them
                <li key={ticket._id} className="list-group-item">
                  <strong>Subject:</strong> {ticket.title} <br /> {/* Display subject */}
                  <strong>Status:</strong> {ticket.status} <br /> {/* Display status */}
                  <strong>Description:</strong> {ticket.description} <br /> {/* Display description */}
                  <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()} {/* Display creation date */}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {showTicketForm && (
        <div>
          <h3 className="my-3">Create New Ticket</h3>
          <TicketForm onSubmit={handleCreateTicket} /> {/* Render the TicketForm component */}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;