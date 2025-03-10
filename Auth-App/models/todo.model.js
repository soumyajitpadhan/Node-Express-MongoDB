import mongoose, { model, Schema } from "mongoose";

const TodoSchema = new Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, ref: "user" }
})

export const todoModel = model("todo", TodoSchema);