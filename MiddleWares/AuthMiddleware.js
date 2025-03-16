// const User = require("../model/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;  // ✅ Added optional chaining to prevent errors

//     if (!token) {
//       return res.status(401).json({ status: false, message: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
//       }

//       const user = await User.findById(decoded.id).select("-password"); // ✅ Exclude password for security
//       if (!user) {
//         return res.status(401).json({ status: false, message: "Unauthorized: User not found" });
//       }

//       req.user = user;  // ✅ Attach user data to request
//       next();  // ✅ Proceed to next middleware/controller
//     });
//   } catch (error) {
//     console.error("User verification error:", error);
//     res.status(500).json({ status: false, message: "Internal server error" });
//   }
// };
// const jwt = require("jsonwebtoken");

// const userVerification = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("📌 Received Authorization Header:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ message: "Forbidden: No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Extract the token
//   console.log("🔑 Extracted Token:", token);

//   if (!process.env.TOKEN_KEY) {  // 🔥 Fix: Use TOKEN_KEY instead of JWT_SECRET
//     console.error("❌ TOKEN_KEY is missing in environment variables.");
//     return res.status(500).json({ message: "Internal server error: Missing JWT secret" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);  // 🔥 Fix: Use TOKEN_KEY
//     console.log("✅ Token Decoded:", decoded);

//     req.user = decoded; // Attach user data to `req`
//     next();
//   } catch (error) {
//     console.error("❌ Token Verification Failed:", error.message);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token has expired", error: error.message });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(403).json({ message: "Invalid token", error: error.message });
//     }
//     return res.status(403).json({ message: "Authentication failed", error: error.message });
//   }
// };

// module.exports = { userVerification };
// const jwt = require("jsonwebtoken");

// const userVerification = (req, res, next) => {
//   try {
//     console.log("Token")
//     // Check for token in cookies
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "No token provided, authorization denied" });
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Invalid token" });
//       }
      
//       // Attach user info to the request object
//       req.user = decoded;
//       next(); // Pass to the next middleware or route handler
//     });
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     res.status(500).json({ message: "Something went wrong. Please try again." });
//   }
// };

// module.exports = { userVerification };

const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
  // 1. Check if the token is present in cookies
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Token missing. Authorization denied." });
  }

  // 2. Verify the token using the JWT secret
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token. Authorization denied." });
    }
    
    // 3. If valid, attach the decoded user data to the request object
    req.user = decoded;

    // 4. Proceed to the next middleware or route handler
    next();
  });
};

module.exports = {userVerification};