import express from 'express';
import { connectToDb } from './config/db.js';
import { todoRouter } from './routes/todo.routes.js';

const app = express();

app.use(express.json());

app.use("/todos", todoRouter);

app.listen(3000, async () => {
    try {
        await connectToDb();
    }
    catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 3000")
})