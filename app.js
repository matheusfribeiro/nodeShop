const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require('./models/order')
const OrderItem = require('./models/order-items')

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsTo(Cart, { through: CartItem });
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

sequelize
  //.sync({ force: true }) //overwrite tables - only use in development mode
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result)
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Matt", email: "matheus@test.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart()
    //console.log(user)
  
  })
  .then(cart =>{
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
