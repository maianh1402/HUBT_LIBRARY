import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likeCount: {
        type: [String],
        default: []
    },
})

const CourseModal = mongoose.model('Course', courseSchema)

export default CourseModal
