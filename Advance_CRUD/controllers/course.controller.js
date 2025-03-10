import { courseModel } from "../models/course.model.js"

const addCourses = async (req, res) => {
    try {
        await courseModel.create(req.body);
        res.status(201).json({ message: "Course added successfully." });
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}

const getCourses = async (req, res) => {
    try {
        const { title, instructor, sortBy, order, page = 1, limit = 5 } = req.query;

        let query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        if (instructor) {
            // query.instructor = instructor;
            query.instructor = { $regex: instructor, $options: 'i' };
        }

        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = order === 'asc' ? 1 : -1;
        }
        else {
            sortOption['title'] = 1;
        }

        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const offset = (pageNumber - 1) * pageSize;

        // let courses = await courseModel.find(query);
        // let courses = await courseModel.find().sort(sortOption);
        // let courses = await courseModel.find().skip(offset).limit(pageSize);
        let courses = await courseModel.find(query).sort(sortOption).skip(offset).limit(pageSize);
        res.status(200).json({ courses });
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
}


export { addCourses, getCourses }


