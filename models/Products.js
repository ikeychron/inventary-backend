const Sequelize = require("sequelize");
const db = require("../config/db");
const CategoryProduct = require("./CategoryProduct");

const Users = db.define("products", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING(100), allowNull: false },
  stock: { type: Sequelize.INTEGER(), allowNull: false },
  medide: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
});

Users.belongsTo(CategoryProduct);

module.exports = Users;
