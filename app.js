const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const port = 3000

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/admin', adminRoutes)

app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found...</h1>')
})



app.listen(port, () => console.log(`Server is listening on port ${port}`));
