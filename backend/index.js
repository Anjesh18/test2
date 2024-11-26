import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './routes/userRouter.js'
import blogRouter from './routes/blogRouter.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/blogs', blogRouter)

mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("database connected"))

app.listen(process.env.PORT, ()=>console.log(`app listening on port ${process.env.PORT}`))