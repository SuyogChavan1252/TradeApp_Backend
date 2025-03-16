// const User = require("../model/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res) => {
//   try {
//     const { email, password, username, createdAt } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await User.create({ email, password: hashedPassword, username, createdAt });

//     const token = createSecretToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,  // Change to true in production (HTTPS)
//       sameSite: "lax",
//     });

//     res.status(201).json({ message: "User signed up successfully", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong. Please try again." });
//   }
// };

// module.exports.Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Incorrect email or password" });
//     }

//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res.status(401).json({ message: "Incorrect email or password" });
//     }

//     const token = createSecretToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//     });

//     res.status(200).json({ message: "User logged in successfully", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong. Please try again." });
//   }
// };
const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports.Signup = async (req, res) => {
  try {
    const { email,  username ,password} = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(password)
    console.log(hashedPassword)
    const user = await User.create({
      email,
      password: hashedPassword,
      username
    });

    const token = createSecretToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True in production
      sameSite: "strict"
    });

    res
      .status(201)
      .json({ message: "User signed up successfully", success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "No email exists" });
    }
    
    console.log("User found:", user);
    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);
    const auth = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", auth);
    
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = createSecretToken({id: user._id, email: user.email});
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res
      .status(200)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again. " });
  }
};

module.exports.GetUserInfo = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    res.json(decoded.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again. " });
  }
}