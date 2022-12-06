import express from "express";
const router = express.Router();
import auth from '../middleware/auth.js'

import { createCourse, deleteCourse, getCourse, getCourses, getCoursesByUser, updatedCourse } from "../controllers/course.js";

router.post('/',/* auth,*/ createCourse)
router.get('/', getCourses)
router.get('/:id', getCourse)
router.delete('/:id', auth, deleteCourse)
router.patch('/:id', auth, updatedCourse)
router.get('/userCourses/:id', auth, getCoursesByUser)


export default router;