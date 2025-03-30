import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser()); // Middleware to parse cookies


// Set a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Soumyajit', { maxAge: 900000, httpOnly: true });
    res.send("Cookie has been set");
})

// Get cookies
app.get('/get-cookie', (req, res) => {
    res.send(req.cookies); // Access stored cookies
})

// Delete a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send("Cookie has been deleted");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

