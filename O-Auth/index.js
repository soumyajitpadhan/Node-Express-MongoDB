const express = require("express");
const axios = require("axios");
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

app.get("/login/github", (req, res) => {
    // const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`;
    res.redirect(redirectUrl);
})

app.get("/auth/github", async (req, res) => {
    const { code } = req.query;
    // console.log(code);

    if (!code) {
        return res.status(400).json({ error: "Authorization code missing" });
    }

    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token',
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
            },
            {
                headers: { Accept: "application/json" }
            }
        );

        const accessToken = tokenResponse.data.access_token;
        // console.log(accessToken);

        if (!accessToken) {
            return res.status(400).json({ error: "Failed to retrieve access token" });
        }

        const userResponse = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const userEmailResponse = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const userData = userResponse.data;
        const userEmail = userEmailResponse.data;
        // console.log(userData);

        res.status(200).json({
            success: true,
            user: userData,
            userEmail
        })
    }
    catch (error) {
        console.error("Error fetching access token: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})