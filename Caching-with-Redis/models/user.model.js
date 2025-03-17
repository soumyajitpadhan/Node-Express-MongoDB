import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    age: Number,
})

export const userModel = model("user", UserSchema);