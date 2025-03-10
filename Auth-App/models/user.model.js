import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
})

export const userModel = model("user", UserSchema);