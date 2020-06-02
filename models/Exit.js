const Sequelize = require("sequelize");
const db = require("../config/db");
const Users = require("./Users");
const DetailsProduct = require("./DetailsProduct");

const Exit = db.define("exit", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING(60), allowNull: false },
  last_name: { type: Sequelize.STRING(60), allowNull: false },
  sex: { type: Sequelize.STRING(60), allowNull: false },
  phone: { type: Sequelize.STRING(60) },
  age: { type: Sequelize.INTEGER(), allowNull: false },
  dni: {
    type: Sequelize.STRING(11),
    allowNull: false,
    unique: true,
  },
  date: { type: Sequelize.DATE, allowNull: false, defaultValue: new Date() },
  description: { type: Sequelize.STRING(100) },
  proof: { type: Sequelize.STRING(10) },
});

Exit.belongsTo(Users);
Exit.belongsTo(DetailsProduct);

module.exports = Exit;
