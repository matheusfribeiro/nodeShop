const express = require('express')
const fs = require('fs')

const path = require('path')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

fs.readFile(p, (err, data) => {
  if (data.length === 0) {
    fs.writeFile(p, "[]", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)



app.listen(port, () => console.log(`Server is listening on port ${port}`));
