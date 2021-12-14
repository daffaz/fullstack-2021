require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()

// router
const blogsRouter = require('./controller/blogs')
// middleware
const middleware = require('./utils/middleware')
// logger
const logger = require('./utils/logger')
// config
const config = require('./utils/config')

// cors
app.use(cors())
// body parser
app.use(express.json())

// connect to mongodb
mongoose.connect(config.MONGODB_URI).then((_) => {
  logger.info('connected to DB')
})

// middleware
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
