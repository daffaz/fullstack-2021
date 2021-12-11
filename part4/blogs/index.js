require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()

// cors
app.use(cors())
app.use(express.json())

// blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
// connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(result => {
    console.log('connected to DB')
})

app.get('/api/blogs', (_, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(newBlogs => {
        res.status(201).json(newBlogs)
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`)
})