const mongoose = require('mongoose')

// blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// prettify the return JSON
blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()

    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
