const express = require('express')
const mongoose = require('mongoose')

//API
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

//DB config
const { mongoURI } = require('./config/keys')
//Connect to mongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello'))

//Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
