const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testing',
    author: 'Matty',
    url: 'http',
    likes: 5
  },
  {
    title: 'Testing2',
    author: 'Matthew',
    url: "http2",
    likes: 1
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}