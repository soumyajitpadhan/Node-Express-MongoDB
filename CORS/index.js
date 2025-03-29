import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); // Enables CORS for all origins  

app.use(cors({ origin: 'http://example.com' })); // Enables CORS only for a specific origin  

app.use(cors({ origin: ['http://example.com', 'http://another.com'] })); // Enables CORS for multiple origins  

app.use(cors({ origin: '*', credentials: true })); // Allows all origins and enables credentials (cookies, auth headers)  

app.use(cors({ origin: 'http://example.com', credentials: true })); // Enables CORS for a specific origin with credentials  

app.use(cors({ origin: 'http://example.com', methods: ['GET', 'POST', 'PUT', 'DELETE'] })); // Restricts allowed HTTP methods  

app.use(cors({ origin: 'http://example.com', allowedHeaders: ['Content-Type', 'Authorization'] })); // Specifies allowed request headers  

app.use(cors({ origin: 'http://example.com', exposedHeaders: ['Content-Length', 'X-Custom-Header'] })); // Specifies response headers accessible to client  

app.use(cors({ origin: 'http://example.com', maxAge: 600 })); // Caches preflight response for 10 minutes  


app.get('/', (req, res) => {
    res.send('CORS Enabled');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})




