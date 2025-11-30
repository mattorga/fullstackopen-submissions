const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length)

}) 

test('unique identifier property is named \'id\'', async () => {
  const response = await helper.blogsInDb()

  // Loop over the response and assert
  response.forEach(blog => {
    assert.strictEqual(blog.hasOwnProperty('id'), true)
  });
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Added from Supertest',
    author: 'Supertest',
    url: 'http',
    likes: 100
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Added from Supertest'))
})

test('a default value of \'likes\' is given ', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Supertest',
    url: 'http',
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const noLikesBlog = blogsAtEnd[blogsAtEnd.length - 1]
  assert.strictEqual(noLikesBlog.likes, 0)
})

test('missing title or url property', async () => {
  const noTitleBlog = {
    author: 'Supertest',
    url: 'http',
    likes: 1
  }

  let response = await api
    .post('/api/blogs/')
    .send(noTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  assert(response.body.error.includes('title'))

  const noAuthorBlog = {
    title: 'No likes',
    url: 'http',
    likes: 1
  }
  response = await api
    .post('/api/blogs/')
    .send(noAuthorBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  assert(response.body.error.includes('author'))



  
})

after(async () => {
  await mongoose.connection.close()
})