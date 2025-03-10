import { authMw } from "../middlewares/auth.middleware.js";
import { todoModel } from "../models/todo.model.js";

const addTodos = async (req, res) => {
    try {
        await todoModel.create(req.body);
        res.status(201).json({ message: "Todo created." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error. Failed to create todo." });
    }
}

const getTodos = async (req, res) => {
    try {
        let todos = await todoModel.find({ userId: req.body.userId }); // Fetch only the logged-in user's todos
        res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error. Failed to fetch todos." });
    }
}

const getTodoById = async (req, res) => {
    try {
        let todo;

        if (req.role === 'admin') {
            // Admin can access any todo
            todo = await todoModel.findOne({ _id: req.params.id });
        }
        else {
            // Users can only access their own todos
            todo = await todoModel.findOne({ _id: req.params.id, userId: req.body.userId });
        }

        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({ message: "Todo fetch successfully.", data: todo });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

const getAllTodos = async (req, res) => {
    try {
        let todos = await todoModel.find({});
        if (!todos.length) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.status(200).json({ message: "Todos", data: todos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { addTodos, getTodos, getTodoById, getAllTodos };