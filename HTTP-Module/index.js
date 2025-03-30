const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("HTTP Module");
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})

// Explanation:
// Import the http module – Node.js provides a built-in module to create an HTTP server.
// Create a server using http.createServer() – This function takes a callback with req (request) and res (response).
// Send a response – We set the response header and send a simple text response.
// Listen on port 3000 – The server runs on http://localhost:3000.


// res.writeHead(200, { 'content-type': 'text/plain' })
// writeHead(200, { ... }) sets the response status code and headers.
// 200 is the HTTP status code, meaning "OK" (successful request).
// { 'content-type': 'text/plain' } tells the browser that the response is plain text.

// res.end("HTTP Module")
// This sends the response body "HTTP Module" to the client.
// It also ends the response, meaning no more data will be sent.

