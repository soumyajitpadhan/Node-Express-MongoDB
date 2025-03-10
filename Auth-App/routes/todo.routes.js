import express from 'express';
import { addTodos, getAllTodos, getTodoById, getTodos } from '../controllers/todo.controller.js';
import { authMw } from '../middlewares/auth.middleware.js';

const todoRouter = express.Router();

todoRouter.post("/", authMw(["user"]), addTodos);
todoRouter.get("/admin", authMw(["admin"]), getAllTodos);
todoRouter.get("/", authMw(["user"]), getTodos);
todoRouter.get("/:id", authMw(["admin", "user"]), getTodoById);

export { todoRouter };

