const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = [
    {
      title: 'Wawan the cat',
      author: 'Wawan',
      url: 'wawan.com',
      likes: 2,
    },
    {
      title: 'Wawan the cat second series',
      author: 'Wawan2nd',
      url: 'notwawan.com',
      likes: 4,
    },
  ]

  const blogObjects = blogs.map((blog) => new Blog(blog))
  const blogsPromises = blogObjects.map((blog) => blog.save())

  await Promise.all(blogsPromises)
})

describe('blogs', () => {
  test('get all blogs', async () => {
    const response = await Blog.find({})

    expect(response).toHaveLength(2)
  })
  test('verifies the id identifier exist or defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('successfully add new post', async () => {
    const blogAtStart = await Blog.find({})

    const newBlog = {
      title: 'Wawan the 3rd',
      author: 'not Wawan',
      url: 'wawan443.com',
      likes: 1,
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogAtStart.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
