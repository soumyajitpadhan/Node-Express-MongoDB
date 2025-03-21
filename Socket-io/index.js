import { createServer } from 'http'
import express from 'express';
import { Server } from 'socket.io';

const app = express();

// Express usually runs on its own, but Socket.io needs a raw HTTP server.
// This line wraps Express inside an HTTP server so that both normal web requests and WebSocket connections can work.
const server = createServer(app);

// Creates a Socket.io server and attaches it to our HTTP server.
// This allows the server to send and receive real-time messages from clients (like a chat app or notifications).
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })

})


server.listen(3000, () => {
    console.log("Server is running on port 3000");
})