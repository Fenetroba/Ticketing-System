import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Access token directly from req.cookies

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access", success: false }); // Return early
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct variable name
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authMiddleware:", error); // Use console.error for errors
    return res.status(500).json({
      error: "An error occurred in the auth middleware",
      success: false,
    });
  }
};

export default authMiddleware;