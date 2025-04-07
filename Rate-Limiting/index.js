import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

// Rate limiter middleware (5 requests per minute per IP)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per minute
    message: "Too many requests. Please try again later.",
});

// Apply rate limiter to base route
app.get("/", limiter, (req, res) => {
    res.send("Welcome to the Home Page!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
