import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Assuming the format is "Bearer <token>"
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    // Verify the token using jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and select the required fields
    const user = await User.findById(decoded.id).select(
      "username email profileImage createdAt"
    );

    req.user = {
      id: decoded.id,
      username: user.username,
      email: user.email,
      pic: user.profileImage,
      createdAt: user.createdAt,
    };
    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Send an error response if the token is invalid
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
