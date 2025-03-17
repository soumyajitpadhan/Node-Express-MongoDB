import express, { json } from 'express';
import { userModel } from '../models/user.model.js';
import { redisClient } from '../config/redis.js';

const userRouter = express.Router();

userRouter.post("/add", async (req, res) => {
    let user = await userModel.create(req.body);
    redisClient.del("allUsers");
    res.status(201).json({ message: "User created", user });
})

userRouter.get("/", async (req, res) => {
    try {
        let cachedUsers = await redisClient.get("allUsers");

        if (cachedUsers) {
            return res.status(200).json({ source: "Redis", user: JSON.parse(cachedUsers) });
        }

        let users = await userModel.find();
        await redisClient.set("allUsers", JSON.stringify(users));
        await redisClient.expire("allUsers", 60);
        res.status(200).json({ source: "DB", users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export { userRouter }