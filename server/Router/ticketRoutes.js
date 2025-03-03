import express from 'express';
import {createTicket,getAllTickets,getTicketById,updateTicket,deleteTicket} from '../Controller/ticketController.js';
const router = express.Router();

// Create a new ticket
router.post('/tickets', createTicket);

// Get all tickets
router.get('/tickets',getAllTickets);

// Get a ticket by ID
router.get('/tickets/:id',getTicketById);

// Update a ticket
router.patch('/tickets/:id', updateTicket);

// Delete a ticket
router.delete('/tickets/:id',deleteTicket);

export default router;