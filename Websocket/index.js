import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

// node index.js
// Run - wscat -c ws://localhost:3000

console.log("Websocket server started");

wss.on("connection", (ws) => {
    // ws -> client
    ws.send("Connected to the client");

    ws.on("message", (message) => {
        console.log(message.toString());

        ws.send("Hello Welcome");

        // console.log(wss.clients);
        wss.clients.forEach((client) => {
            // console.log(client);
            if (client.readyState === WebSocket.OPEN) {
                ws.send("This is the broadcast message, got for every online user");
            }
        })
    })

    ws.on("close", () => {
        console.log("Connection closed");
    })
})


wss.on("error", () => {
    console.log("Error in creating server");
})