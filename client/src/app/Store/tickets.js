import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Lib/Axios'; // Adjust the import based on your file structure


// Async thunk for fetching all tickets
export const fetchAllTickets = createAsyncThunk(
  'tickets/allgettickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tickets/allgettickets");
      return response.data; // Return the fetched tickets data
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Async thunk for updating ticket status
export const updateTicketStatus = createAsyncThunk(
  'tickets/updateTicketStatus',
  async ({ ticketId, newStatus }, { rejectWithValue }) => {
    try {
      // Log the inputs for debugging
      console.log(ticketId, newStatus);

      // Use PUT to update the ticket
      const response = await axios.put(`/tickets/updatetickets/${ticketId}`, { status: newStatus });

      // Log the response data for debugging
      console.log(response.data);

      return response.data; // Return the updated ticket data
    } catch (error) {
      // Check if error response exists, else provide a fallback error message
      return rejectWithValue(error.response?.data?.error || 'Failed to update ticket status');
    }
  }
);

// Async thunk for fetching user tickets
export const fetchUserTickets = createAsyncThunk(
  'tickets/fetchUserTickets',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('/tickets/gettickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log(response.data); // Log the fetched data for debugging
      return response.data; // Return the fetched tickets data
    } catch (error) {
      console.error("Fetch Tickets Error:", error); // Log the error

      if (error.response) {
        return rejectWithValue(error.response.data.error); // Return specific server error
      } else if (error.request) {
        return rejectWithValue("No response from server."); // Handle no response case
      } else {
        return rejectWithValue("An error occurred: " + error.message); // Handle other errors
      }
    }
  }
);

// Async thunk for creating a new ticket
export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async ({ ticketData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/tickets/createtickets', ticketData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the created ticket data
    } catch (error) {
      console.error("Create Ticket Error:", error);
      if (error.response) {
        return rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return rejectWithValue("No response from server.");
      } else {
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

// Create the slice for tickets
const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {
    SetTickets: (state, action) => {
      state.tickets = action.payload; // Set tickets based on action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true; // Set loading to true
        state.error = null; // Clear previous errors
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.tickets = action.payload; // Set tickets in state
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set error message
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const updatedTicket = action.payload;
        const index = state.tickets.findIndex(ticket => ticket._id === updatedTicket._id);
        if (index !== -1) {
          state.tickets[index] = updatedTicket; // Update the ticket in the state
        }
      })
      .addCase(fetchUserTickets.pending, (state) => {
        state.loading = true; // Set loading to true when fetching user tickets
        state.error = null; // Clear previous errors
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetching is done
        state.tickets = action.payload; // Set user tickets in state
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set error message
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true; // Set loading to true when creating a ticket
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when creation is done
        state.tickets.push(action.payload); // Add the new ticket to the state
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set error message
      });
  },
});

// Export actions and reducer
export default ticketsSlice.reducer;
export const { SetTickets } = ticketsSlice.actions;