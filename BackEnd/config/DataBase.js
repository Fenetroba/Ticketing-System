import mongoose from "mongoose";
import env from "dotenv";
env.config();
 const connectDB = async () => {
     try {
          await mongoose.connect(process.env.DATA_BASE);
          console.log("DB connected"+process.env.DATA_BASE);
     } catch (error) {
          console.log("error in database",error);
     }
};

export default connectDB;