import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    
    const token = authHeader.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      // Custom JWT token
      decodedData = jwt.verify(token, JWT_SECRET);
      req.userId = decodedData?.id;
      req.userName = decodedData?.name; // ADD THIS LINE
    } else {
      // Google OAuth token
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      req.userName = decodedData?.name; // ADD THIS LINE
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;