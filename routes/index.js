const express = require("express");
const { body } = require("express-validator");

// Model
const Users = require("../models/Users");

const router = express.Router();

// Controllers
const { newUser, getUser, getUsers } = require("../controllers/userController");
const { login } = require("../controllers/authController");
const {
  newProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/productController");

const schemaValidateUser = [
  body("nameUser")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El nombre de usuario no puede ir vacío")
    .custom((value) => {
      console.log(value);
      return Users.findOne({ where: { nameUser: value } }).then((user) => {
        console.log(user);
        if (user) {
          return Promise.reject("El nombre de usuario ya está en uso");
        }
        return true;
      });
    }),
  body("email")
    .trim()
    .escape()
    .custom((value) => {
      return Users.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("El correo ya está en uso");
        }
        return true;
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
      return true;
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
        return true;
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

const schemaValidateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Ingresa un E-mail Válido")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El correo no puede ir vacío"),

  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La contraseña no puede ir vacío")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 5 carácteres"),
];

const schemaValidateProduct = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("El nombre del producto no puede ir vacío"),

  body("stock")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La cantidad del producto no puede ir vacía"),

  body("medide")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La unidad de medida del producto no puede ir vacía"),

  body("categoryProductId")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("La categoría del producto no puede ir vacía"),
];

module.exports = () => {
  router.get("/users", getUsers);
  router.post("/user", getUser);
  router.post("/new-user", schemaValidateUser, newUser);

  router.post("/login", schemaValidateLogin, login);

  router.get("/products", getProducts);
  router.post("/product", getProduct);
  router.post("/new-product", schemaValidateProduct, newProduct);
  router.put("/product", schemaValidateProduct, updateProduct);
  router.delete("/product", deleteProduct);

  return router;
};
