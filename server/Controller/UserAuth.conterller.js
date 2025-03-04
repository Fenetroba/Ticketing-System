import UserAuthData from "../model/UserAuth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const SignUp = async (req, res) => {
  const { email, password, UserName } = req.body;


  if (!email || !password || !UserName) {
    return res
      .status(400)
      .json({ error: "All fields are required", success: false });
  }

  try {
    const user = await UserAuthData.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "The user already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserAuthData({
      email,
      password: hashPassword,
      UserName,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ success: "User created successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "An error occurred during sign up", success: false });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuthData.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "The user does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "The password is not correct", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" } 
    );

    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      user: {
        UserName: user.UserName,
        email: user.email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred during login", success: false });
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  return res
    .status(200)
    .json({ message: "Logged out successfully", success: true });
};
export const CheckAuth = async (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Authentecated User", user, succsess: true });
};
