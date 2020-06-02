const Sequelize = require("sequelize");
const db = require("../config/db");

const CategoryProducts = db.define("categoryProducts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: { type: Sequelize.STRING(50), allowNull: false },
});

module.exports = CategoryProducts;
