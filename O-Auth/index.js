const express = require("express");
require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Base end point");
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/auth/github", (req, res) => {
    res.send("Sign in with github successful.");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) 