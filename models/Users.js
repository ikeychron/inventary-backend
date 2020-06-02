const Sequelize = require("sequelize");
const db = require("../config/db");
const bcript = require("bcrypt-nodejs");
const Roles = require("./Roles");

const Users = db.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      allowNull: false,
    },
    nameUser: { type: Sequelize.STRING(60), allowNull: false, unique: true },
    name: { type: Sequelize.STRING(60), allowNull: false },
    last_name: { type: Sequelize.STRING(60), allowNull: false },
    sex: { type: Sequelize.STRING(60), allowNull: false },
    dni: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
    },
    phone: { type: Sequelize.STRING(15) },
    email: {
      type: Sequelize.STRING(30),
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    hooks: {
      // Method password hash
      beforeCreate(usuario) {
        usuario.password = bcript.hashSync(
          usuario.password,
          bcript.genSaltSync(10),
          null
        );
      },
    },
  }
);

Users.belongsTo(Roles);

module.exports = Users;
