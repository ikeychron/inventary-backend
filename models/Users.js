const Sequelize = require("sequelize");
const db = require("../config/db");
const bcript = require("bcrypt-nodejs");
const Roles = require("./Roles");

const Users = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING(60), allowNull: false },
    last_name: { type: Sequelize.STRING(60), allowNull: false },
    dni: {
      type: Sequelize.STRING(11),
      allowNull: false
    },
    phone: { type: Sequelize.STRING(11), allowNull: false },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
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
      }
    }
  }
);

// Method password compare
Users.prototype.validatePassword = password =>
  bcript.compareSync(password, this.password);

Users.belongsTo(Roles);

module.exports = Users;
