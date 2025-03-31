// How do you manage sessions in express?
// In Express, sessions are managed using the express-session middleware, which allows storing user-specific data on the server across multiple requests. Sessions help maintain user authentication, shopping carts, or any temporary user state.

import express from 'express';
import session from 'express-session';

const app = express();
app.use(session({
    secret: 'mySecretKey', // Used to encrypt session data
    resave: false, // Don't save if nothing changes
    saveUninitialized: true, // Create a session even if empty
    cookie: { maxAge: 60000 } // Session expires after 1 minute
}))

// Set session data
app.get('/set-session', (req, res) => {
    req.session.user = 'Soumyajit';
    res.send('Session created');
})

// Get session data
app.get('/get-session', (req, res) => {
    res.send(req.session.user ? `User: ${req.session.user}` : 'No session found');
})

// Destroy session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Session destroyed');
})


app.listen(3000, () => console.log("Server is running on port 3000"));


// Breaking Down Each Option:

// secret: 'mySecretKey'
// This is like a password used to encrypt session data.
// It prevents hackers from tampering with the session.
// Example: If someone tries to modify their session manually, this secret key makes sure they can’t do it.

// resave: false
// Normally, Express saves session data every time a request is made, even if nothing has changed.
// Setting resave: false means it won’t save the session again unless something changes.
// Why? To improve performance and avoid unnecessary database writes.

// saveUninitialized: true
// If true, it creates a session for every user, even if they don’t use it.
// If false, it won’t create a session until the user actually stores something in it.
// Example:
// If a new user visits your website but doesn’t log in, should we create a session for them?
// Setting this to true means yes, create a session even if it's empty.

// cookie: { maxAge: 60000 }
// This sets an expiration time for the session cookie.
// maxAge: 60000 means the session will expire in 60 seconds (1 minute).
// After that, the session will be deleted, and the user will have to start over.

