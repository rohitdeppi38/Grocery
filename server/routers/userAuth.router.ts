import { Router } from "express";

import User from "../models/Users.model/user";
import jwt from "jsonwebtoken";

const router = Router();

router.get('/', (req, res) => {
    console.log(req.body);

    if (!req.body.token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body);

    try {
        //user registratio logic 

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        //check if user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //save user to database
        await User.create({ name: username, email: email, password: password });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //  Check password (simple version for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Send token to frontend
    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;