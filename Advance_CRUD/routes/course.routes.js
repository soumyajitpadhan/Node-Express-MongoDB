import express from 'express';
import { addCourses, getCourses } from '../controllers/course.controller.js';

const courseRouter = express.Router();

courseRouter.post("/add-course", addCourses);
courseRouter.get("/", getCourses);

export { courseRouter }