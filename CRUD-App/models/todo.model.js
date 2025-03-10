import mongoose, { model, Schema } from "mongoose";

const TodoSchema = new Schema({
    title: String,
    status: { type: String, default: false },
})

export const todoModel = model("todo", TodoSchema);