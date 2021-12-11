const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (_, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((newBlogs) => {
    res.status(201).json(newBlogs)
  })
})

module.exports = blogsRouter
