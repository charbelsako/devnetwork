require('dotenv').config() // get you env variables
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
// API routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB URI
const { mongoURI } = require('./config/keys')
// Connect to mongoDB
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err))

// Passport Middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport.js')(passport)

app.get('/', (req, res) => res.send('hello'))

//Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// For heroku
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  app.use(express.static('client/build'))
  console.log(path.resolve(__dirname, 'client/', 'build/', 'index.html'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/', 'build/', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
