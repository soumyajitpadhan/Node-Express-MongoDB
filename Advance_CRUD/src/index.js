import express from 'express';
import { connectToDb } from '../config/db.js';
import { courseRouter } from '../routes/course.routes.js';

const app = express();

app.use(express.json());

app.use("/courses", courseRouter);

app.listen(3000, async () => {
    try {
        await connectToDb();
    }
    catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 3000");
})