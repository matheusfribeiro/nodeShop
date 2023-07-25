const Sequelize = require('sequelize')

const sequelize = new Sequelize("node-complete", "root", "672645", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize