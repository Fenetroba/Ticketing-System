import Ticket from '../model/Ticket.js'; 


export const getUserTickets = async (req, res) => {
  try {

    const tickets = await Ticket.find({ userAuth: req.user._id })
    
    const userTickets = tickets.map((ticket) => {
      return ticket.toJSON(); 
    });

    res.json(userTickets);
  } catch (error) {
    console.log("Error in getUserTickets controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const createTicket = async (req, res) => {
  try {
   
    console.log("Creating ticket for user ID:", req.user.id);

   
    const ticket = new Ticket({
      title: req.body.subject,
      description: req.body.description,
      status: req.body.status || 'In Progress',
      userId: req.user.id, 

    });


    const savedTicket = await ticket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error.message); // Log the error
    res.status(400).json({ message: "Failed to create ticket", error: error.message });
  }
};


  
 export const getTicketById = async (req, res) => {
  try {
    const userId = req.user.id; 
 console.log(userId)
  
    const tickets = await Ticket.find({ userId: userId }).populate('userId', '_id UserName email'); 

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found for this user' });
    }

    res.status(200).json(tickets); 
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
 };



export const updateTicket =  async (req, res) => {
  const { id } = req.params; 
  const updatedData = req.body; 

  try {
    
    const ticket = await Ticket.findByIdAndUpdate(id, updatedData, { new: true });

    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

   
    res.json(ticket);
  } catch (error) {
 
    res.status(500).json({ message: error.message });
  }
}


