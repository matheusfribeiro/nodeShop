const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/admin', adminData.routes)

app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
})



app.listen(port, () => console.log(`Server is listening on port ${port}`));
