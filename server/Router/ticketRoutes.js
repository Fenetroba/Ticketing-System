import express from 'express';
import {createTicket,getUserTickets,getTicketById,updateTicket} from '../Controller/ticketController.js';
import authMiddleware from '../Middleware/Auth.middleware.js';
const router = express.Router();

// Create a new ticket
router.post('/createtickets',authMiddleware ,createTicket);

// Get all tickets
router.get('/allgettickets',authMiddleware ,getUserTickets);

// Get a ticket by ID
router.get('/gettickets',authMiddleware ,getTicketById);

// Update a ticket
router.put('/updatetickets/:id',authMiddleware, updateTicket);

export default router;