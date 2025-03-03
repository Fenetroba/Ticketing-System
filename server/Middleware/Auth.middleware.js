import jwt from "jsonwebtoken";
import env from "dotenv";

// Load environment variables from .env file
env.config();

const authMiddleware = async (req, res, next) => {
  // Access the token from cookies
  const token = req.cookies.token;

  try {
    // Check if token is present
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to the request
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error); // Log the error

    // Check if the error is due to token expiration or invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token", success: false });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", success: false });
    }

    // Handle other possible errors
    return res.status(500).json({
      message: "An error occurred in the auth middleware",
      success: false,
    });
  }
};

export default authMiddleware;