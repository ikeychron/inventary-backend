const Sequelize = require("sequelize");
const db = require("../config/db");

const Roles = db.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: { type: Sequelize.STRING(30), allowNull: false },
});

module.exports = Roles;
