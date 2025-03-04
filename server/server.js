import express from "express";
import env from 'dotenv';
import Authrouter from "./Router/UserAuth.Router.js";
import Ticketrouting from "./Router/ticketRoutes.js";
import connectDB from "./Lib/DataBase.js";
import cors from "cors";
import cookieParser from 'cookie-parser'
env.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [ // Corrected spelling
        "Content-Type", // Corrected casing
        "Authorization",
        "Cache-Control", // Corrected spelling
        "Expires",
        "Pragma",
    ],
    credentials: true // Corrected spelling
}));

// Connect to the database before defining routes
connectDB();

app.use("/api/auth", Authrouter);
app.use("/api/tickets", Ticketrouting);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
});
