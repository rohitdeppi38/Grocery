import { Router } from "express";

import User from "../models/Users.model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

const router = Router();

router.get('/', (req, res) => {
    console.log(req.body);

    if (!req.body.token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
})

router.post('/signup', async (req, res) => {
    console.log(req.body);

    try {
        //user registration logic 

        const { firstName, lastName, email,password,address,dob } = req.body;

        if (!firstName || !lastName ||!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        //check if user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        //save user to database
        const newUser = await User.create({ name: firstName +" "+ lastName, email: email, password: hashedPassword ,address:address,dob:dob});
        
        //generating token
         const token = jwt.sign(
      { id: newUser._id },
      jwtSecret,
      { expiresIn: "1d" }
    );
    res.json({
      message:"signup is sucessfull",
      token
    })

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
    const isMatched = await bcrypt.compare(password,user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Generate Token
    const token = jwt.sign(
      { id: user._id },
      jwtSecret,
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
