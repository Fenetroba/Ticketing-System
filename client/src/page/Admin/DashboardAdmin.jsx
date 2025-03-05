
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets, updateTicketStatus } from "../../app/Store/tickets";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import PageLoder from "../../component/loder/PageLoder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [displayTickets, setDisplayTickets] = useState(false);
  const dispatch = useDispatch();
  const { tickets, error, loading } = useSelector((state) => state.tickets);
  const { user} = useSelector((state) => state.Auth);
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleStatusUpdate = (ticketId, newStatus) => {
    toast.info(`Setting ticket to ${newStatus}...`, {
      onClose: () => {
        dispatch(updateTicketStatus({ ticketId, newStatus }));
        toast.success(`Ticket status updated to ${newStatus}!`);
      }
    });
  };
  console.log(user)

  const handleSelectChange = (ticketId, event) => {
    const newStatus = event.target.value;
    handleStatusUpdate(ticketId, newStatus);
  };

  const toggleDescription = (ticketId) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const displayTicketHandler = () => {
    setDisplayTickets((prev) => !prev);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center">Admin Dashboard</h2>
      {loading && <PageLoder />}
      {error && <p className="text-danger">{error}</p>}
      
      <h3
        onClick={displayTicketHandler}
        style={{
          borderRadius: "4px",
          backgroundColor: "#faa96b",
          width: "200px",
          padding: "4px 20px",
          cursor: 'pointer',
          fontSize:"20px"
        }}
      >
        All Tickets{" "}
        {displayTickets ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
      </h3>
      <p className="bg-light ">You Have {tickets.length } Tickets</p>
      {displayTickets && (
        <div>
          
          {tickets.length === 0 ? (
            <p>No tickets available.</p>
          ) : (
            <div className="row">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
                  <div className="border rounded p-3 h-100" style={{ backgroundColor: "#c0e4a4" }}>
                    <strong>Title:</strong> {ticket.title} <br />
                    <strong style={{ color: ticket.status === "Closed" ? "red" : ticket.status === "In Progress" ? "#f3c331" : "green" }}>
                      Status:
                    </strong> {ticket.status} <br />
                    <strong>Description:</strong>
                    <button className="btn btn-link p-0" onClick={() => toggleDescription(ticket._id)}>
                      {visibleDescriptions[ticket._id] ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                    </button>
                    <br />
                    {visibleDescriptions[ticket._id] && (
                      <p className="bg-light border p-2">{ticket.description}</p>
                    )}
                    <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()} <br />
                    <div className="mt-2">
                      <select className="form-select" value={ticket.status} onChange={(event) => handleSelectChange(ticket._id, event)}>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;