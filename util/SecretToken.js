require("dotenv").config();
const jwt = require("jsonwebtoken");

// Load secret key from environment variables
const secretKey = process.env.TOKEN_KEY || "default_secret";
console.log("Using secret key:", secretKey);

// Function to create a JWT token
function createSecretToken(data) {
  return jwt.sign({ data }, secretKey, {
    expiresIn: "3d", // 3 days
  });
}

// Export the function for use in other files
module.exports = { createSecretToken };
