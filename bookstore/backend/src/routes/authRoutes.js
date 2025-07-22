import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15day" });
};

router.post("/register", async (req, res) => {
  console.log("Register route hit");

  try {
    const { email, username, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataars/svg?seed=${username}`;
    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/login", async (req, res) => {
  res.send("Login");
});

export default router;




 // Check for existing user
    // const [existingUsername, existingEmail] = await Promise.all([
    //   User.findOne({ username }),
    //   User.findOne({ email }),
    // ]);

    // if (existingUsername) {
    //   console.log("Username already exists:", username);
    //   return res.status(400).json({ message: "Username already exists" });
    // }

    // if (existingEmail) {
    //   console.log("Email already exists:", email);
    //   return res.status(400).json({ message: "Email already exists" });
    // }