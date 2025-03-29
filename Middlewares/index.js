import express from 'express';

const app = express();

// Middleware Function (Logs Requests)
const loggerMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next(); // Pass control to the next middleware or route handler
};

app.use(loggerMiddleware); // Apply middleware globally

app.get('/', (req, res) => {
    res.send('This is test route');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// How it Works?
// Browser sends a GET request.
// Express receives the request.
// Middleware logs the request and calls next().
// Route handler processes the request and sends "This is test route".
// The browser receives and displays the response.
