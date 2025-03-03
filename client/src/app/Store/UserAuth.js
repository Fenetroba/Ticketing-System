import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Lib/Axios.js";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null, // Added error state
};

export const signupUser = createAsyncThunk(
  "/auth/signup",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/signup", form, {
        withCredentials: true,
      });
      return response.data; // Return success data
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        return rejectWithValue(error.response.data.error); // Return specific error message
      } else if (error.request) {
        console.error("No response received:", error.request);
        return rejectWithValue("No response from server.");
      } else {
        console.error("Error message:", error.message);
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (loginUser, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", loginUser, {
        withCredentials: true, // Include credentials if needed
      });
      return response.data; // Return the successful response data
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        return rejectWithValue(error.response.data.error); // Return specific error message
      } else if (error.request) {
        console.error("No response received:", error.request);
        return rejectWithValue("No response from the server.");
      } else {
        console.error("Error message:", error.message);
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post("/auth/logout", {}, {
      withCredentials: true,
    });
    return response.data;
   
  }
);

export const CheckAuths = createAsyncThunk(
  "/auth/checkAuth",
  async () => {
    const response = await axios.get("/auth/check-auth", {
      withCredentials: true,
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate, proxy-revalidate",
      },
    });
    return response.data; // Ensure you return the response data
  }
);

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload; // Set user based on action payload
    },
  
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true; // Set loading to true
        state.error = null; // Clear previous errors
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        toast.success("Signup successful!"); // Show success message
        state.user = action.payload.user || null; // Adjust based on your logic
        state.isAuthenticated = action.payload.success; // Adjust based on your logic
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.payload || "Something went wrong"; // Capture error message
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Set user from payload
        state.isAuthenticated = action.payload.success; // Set authentication state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
        state.error = action.payload || "Login failed"; // Capture error message
      })
      .addCase(CheckAuths.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(CheckAuths.fulfilled, (state, action) => {
        console.log(action); // Log action for debugging
        state.loading = false; // Set loading to false
        state.isAuthenticated = true; // Set authenticated state
        state.user = action.payload.user || null; // Set user based on response
      })
      .addCase(CheckAuths.rejected, (state) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });;
  },
});

// Export actions
export const {SetUser } = authSlice.actions; 
export default authSlice.reducer; // Export reducer