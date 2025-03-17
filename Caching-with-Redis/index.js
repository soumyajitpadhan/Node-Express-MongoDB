import express from 'express';
import { connectedToDb } from './config/db.js';
import { userRouter } from './routes/user.routes.js';

const app = express();
app.use(express.json());

app.use("/users", userRouter);

const startServer = async () => {
    try {
        await connectedToDb();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

startServer();