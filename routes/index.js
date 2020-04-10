const express = require("express");
const { body } = require("express-validator");

// Model
const Users = require("../models/Users");

const router = express.Router();

// Controllers
const { newUser, getUser, getUsers } = require("../controllers/userController");

const schemaValidate = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Ingresa un E-mail Válido")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El correo no puede ir vacío")
    .custom((value) => {
      return Users.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("El correo ya está en uso");
        }
      });
    }),

  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La contraseña no puede ir vacío")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe tener mínimo 5 carácteres")
    .custom((value, { req }) => {
      if (value !== req.body.confirm_password) {
        throw new Error("La contraseñas no coinciden");
      }
    }),
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El nombre no puede ir vacío"),
  body("last_name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El apellido no puede ir vacío"),

  body("dni")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La cédula no puede ir vacía")
    .custom((value) => {
      return Users.findOne({ where: { dni: value } }).then((user) => {
        if (user) {
          return Promise.reject("La cédula ya está en uso");
        }
      });
    }),

  body("phone")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El teléfono no puede ir vacío"),

  body("roleId")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El rol no puede ir vacío"),

  body("sex")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El sexo no puede ir vacío"),
];

module.exports = () => {
  router.get("/users", getUsers);
  router.post("/user", getUser);
  router.post("/new-user", schemaValidate, newUser);

  return router;
};
