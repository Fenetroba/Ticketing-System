import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import Load from '../loder/Loder'
const TicketForm = ({ onSubmit }) => {
  const {loading } = useSelector((state) => state.tickets);

  const [subject, setSubject] = useState(''); // State for ticket subject
  const [description, setDescription] = useState(''); // State for ticket description

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create ticket data object with default status
    const ticketData = {
      subject,
      description,
     
    };

    onSubmit(ticketData); // Call onSubmit with the ticket data
    resetForm(); // Reset form fields after submission
  };

  const resetForm = () => {
    setSubject('');
    setDescription('');
  };


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">Ticket Title</label>
        <input
          type="text"
          id="subject"
          className="form-control"
          placeholder="Enter ticket subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Ticket Description</label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Enter ticket description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">{loading ? <Load/>:<span>Create Tickets</span>}</button>
    </form>
  );
};

export default TicketForm;