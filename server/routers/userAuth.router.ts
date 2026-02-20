import { Router } from "express";

import User from "../models/Users.model/user";

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

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send("User logged in successfully");
})

export default router;