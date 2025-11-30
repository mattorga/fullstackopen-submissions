const express = require('express');
const mongoose = require('mongoose');

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express();

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
    logger.info('connected to MongoDB') // Convert to logger
  })
  .catch((error) => {
    console.log('error connection to MongoDB')
    logger.error('error connection to MongoDB', error.message) // Convert to logger
  });

// app.use(express.static('dist')) 
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})