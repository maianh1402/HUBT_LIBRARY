import CourseModal from '../models/course.js'
import mongoose from "mongoose";

export const createCourse = async (req, res) => {
    const course = req.body
    const newCourse = new CourseModal({
        ...course,
        creator: req.userId,
        createdAt: new Date().toISOString()
    });
    try {
        await newCourse.save()
        res.status(201).json(newCourse)
    } catch (error) {
        res.status(404).json({ message: 'Đã xảy ra sự cố!' })
    }
}

export const getCourses = async (req, res) => {
    try {
        const courses = await CourseModal.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(404).json({ meessage: 'Đã xảy ra lỗi!' })
    }
}


export const getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await CourseModal.findById(id)
        res.status(200).json(course)
    } catch (error) {
        res.status(404).json({ meessage: 'Đã xảy ra lỗi!' })
    }
}

export const getCoursesByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }
    const userCourses = await CourseModal.find({ creator: id });
    res.status(200).json(userCourses);
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `Không tồn tại khóa học: ${id}` });
        }
        await CourseModal.findByIdAndRemove(id);
        res.json({ message: "Xóa khóa học thành công" });
    } catch (error) {
        res.status(404).json({ message: "Đã xảy ra lỗi!" });
    }
};

export const updatedCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `Không tồn tại khóa học: ${id}` });
        }

        const updatedCourse = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id,
        };
        await CourseModal.findByIdAndUpdate(id, updatedCourse, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(404).json({ message: "Đã xảy ra lỗi!" });
    }
};
