const Sequelize = require("sequelize");
const db = require("../config/db");
const Products = require("./Products");

const DetailsProduct = db.define("detailsProduct", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },
  count: { type: Sequelize.INTEGER(), allowNull: false },
});

DetailsProduct.belongsTo(Products);

module.exports = DetailsProduct;
