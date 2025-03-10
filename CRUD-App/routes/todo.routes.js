import express from 'express';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controller.js';

const todoRouter = express.Router();

todoRouter.post("/add", addTodo);
todoRouter.get("/", getTodo);
todoRouter.patch("/update/:id", updateTodo);
todoRouter.delete("/delete/:id", deleteTodo);

export { todoRouter }