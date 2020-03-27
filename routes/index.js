const express = require("express");
const router = express.Router();

// Controllers
const { newUser, getUser } = require("../controllers/userController");

module.exports = () => {
  router.get("/user", getUser);
  router.post("/user", newUser);

  return router;
};
