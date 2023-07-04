const express = require('express')

const port = 3000

const app = express()

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  console.log('in the middleware', req.url)
  
  next() // Allows the request to continue to the next middleware in line
  
  
})

app.use((req, res, next) => {
  console.log('in another middleware', req.url)
  res.send('<h1>test for echo</h1>')
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));
