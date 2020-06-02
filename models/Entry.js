const Sequelize = require("sequelize");
const db = require("../config/db");
const Users = require("./Users");
const DetailsProduct = require("./DetailsProduct");

const Entry = db.define("entry", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },
  date: { type: Sequelize.DATE, allowNull: false, defaultValue: new Date() },
  description: { type: Sequelize.STRING(100) },
  proof: { type: Sequelize.STRING(10) },
});

Entry.belongsTo(Users);
Entry.belongsTo(DetailsProduct);

module.exports = Entry;
