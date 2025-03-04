import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true }, 
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: /.+\@.+\..+/ 
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const UserAuthData = mongoose.model("UserAuth", userAuthSchema);
export default UserAuthData;