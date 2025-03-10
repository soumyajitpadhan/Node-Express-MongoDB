import mongoose, { model, Schema } from "mongoose";

const CourseSchema = new Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    enrolledStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
})

export const courseModel = model("course", CourseSchema);