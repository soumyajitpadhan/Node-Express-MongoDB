import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

dotenv.config();

export const authMw = (role) => {
    return async (req, res, next) => {
        try {
            let authHeader = req.headers.authorization;
            let token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "User not logged in." });
            }
            else {
                // Verify token
                let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

                // Get user from DB
                let user = await userModel.findOne({ _id: decoded.userId });
                if (!user) {
                    return res.status(404).json({ message: "User not found." });
                }

                // Check if user's role is allowed
                if (role.includes(user.role)) {
                    req.body.userId = decoded.userId;
                    req.role = user.role;
                    next(); // Continue to the next middleware or route handler
                }
                else {
                    return res.status(403).json({ message: "Unauthorized access." });
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Invalid token. Please login again." });
        }
    }
}