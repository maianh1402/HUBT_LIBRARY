import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import courseRouter from './routes/course.js'
// import dotenv from "dotenv";

const app = express()
app.use(morgan("dev"))
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/users", userRouter)
app.use("/course", courseRouter)

const PORT = 5000
mongoose.connect(
    `mongodb+srv://phanh:2002@cluster0.ydxbq5l.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(PORT, () => console.log(`Server run port ${PORT}`))
    })
    .catch((err) => { console.log(`${err} not connect`) })