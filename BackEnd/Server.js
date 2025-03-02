import express from "express";
import env from "dotenv";
import connectDB from "./config/DataBase.js";
env.config()
import cors from "cors";
const app=express();
const PORT=process.env.PORT || 5000



app.listen(PORT,()=>{
     
     connectDB();
     console.log("the port is connect with port "+PORT);
})
