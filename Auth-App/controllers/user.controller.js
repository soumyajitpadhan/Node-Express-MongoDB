import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { userModel } from '../models/user.model.js';

dotenv.config();

const saltRounds = 10;

const userSignup = async (req, res) => {

    const myPlaintextPassword = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

        // let userData = new userModel({...req.body, password: hashedPassword});
        // await userData.save();

        // Create user with hashed password
        let userData = { ...req.body, password: hashedPassword };
        await userModel.create(userData);
        // console.log(hash);
        res.status(201).json({ message: "Signup success!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const userLogin = async (req, res) => {
    try {
        let userData = await userModel.findOne({ email: req.body.email });

        if (!userData) {
            return res.status(404).json({ message: "User not found, please signup." });
        }
        else {
            let myPlaintextPassword = req.body.password;
            let hash = userData.password;

            let result = await bcrypt.compare(myPlaintextPassword, hash);

            if (result) {

                // A JWT (JSON Web Token) consists of three parts, separated by dots (.):
                // header.payload.signature
                let accessToken = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1min' });
                let refreshToken = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful!", accessToken, refreshToken });
            }
            else {
                return res.status(401).json({ message: "Invalid credentials." });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

const getNewAccessToken = async (req, res) => {
    try {
        let refreshToken = req.headers.authorization.split(' ')[1];

        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token required" });
        }

        let decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

        if (decoded) {
            let accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1min' });
            return res.status(200).json({ accessToken });
        }
    }
    catch (error) {
        console.error("Error in refresh token:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Refresh token expired. Please log in again." });
        }
        else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        res.status(500).json({ message: "Something went wrong." });
    }
}

const forgotPassword = async (req, res) => {
    try {
        let userData = await userModel.findOne({ email: req.body.email });

        if (!userData) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Generate a reset token
        const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30min' })

        const resetLink = `http://localhost:3000/users/reset-password/${token}`;

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD,
            },
        });

        // Send email
        await transporter.sendMail({
            from: '"Admin" <padhanrahul843@gmail.com>', // sender address
            // to: req.body.email, // Send email to the user requesting the reset
            to: "rahulpadhan080@gmail.com", // list of receivers
            subject: "Password Reset", // Subject line
            text: `Click here to reset your password: ${resetLink}`, // plain text body
        });
        res.status(200).json({ message: "Password reset link sent to email." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

// Reset Password - Serve HTML Form
const showResetPasswordForm = async (req, res) => {
    let token = req.params.token;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
        </head>

        <body>
            <!-- Absolute paths (starting with /) always refer to the same domain. -->
            <form action="/users/reset-password/${token}" , method="POST">
                <input type="text" name="password" placeholder="Enter new password">
                <input type="submit" value="Reset Password">
            </form>
        </body>

    </html>    
    `)

}

// Reset Password - Update Password in Database
const resetPassword = async (req, res) => {
    try {
        let token = req.params.token;
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            await userModel.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

            res.status(200).json({ message: "Password reset successful!" });
        }
        else {
            res.status(400).json({ message: "Invalid or expired token!" });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}



export { userSignup, userLogin, getNewAccessToken, forgotPassword, showResetPasswordForm, resetPassword };