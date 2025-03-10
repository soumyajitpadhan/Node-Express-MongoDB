import { todoModel } from "../models/todo.model.js"


const addTodo = async (req, res) => {
    try {
        // await todoModel.insertMany([req.body]);

        // let todo = new todoModel(req.body);
        // await todo.save();

        await todoModel.create(req.body);
        res.status(201).json({ message: "Todo added" });
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}

const getTodo = async (req, res) => {
    try {
        let todos = await todoModel.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}

const updateTodo = async (req, res) => {
    let id = req.params.id;

    try {
        await todoModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Todo updated successfully." })
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    let id = req.params.id;

    try {
        await todoModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully." })
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}

export { addTodo, getTodo, updateTodo, deleteTodo }