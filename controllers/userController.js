const Users = require("../models/Users");
const { validationResult } = require("express-validator");

// Get User
exports.getUser = async (req, res, next) => {
  try {
    const id = req.body.id;

    const user = await Users.findByPk(id, {
      attributes: [
        "id",
        "name",
        "last_name",
        "dni",
        "phone",
        "email",
        "is_active",
        "roleId",
      ],
    });

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .json({
        success: false,
        error,
      })
      .status(400);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "id",
        "name",
        "last_name",
        "dni",
        "sex",
        "phone",
        "email",
        "is_active",
        "roleId",
      ],
      where: {
        is_active: true,
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .json({
        success: false,
        error,
      })
      .status(400);
  }
};

// Add User
exports.newUser = async (req, res, next) => {
  const errors = validationResult(req);
  const user = req.body;

  try {
    if (!errors.errors.lenght) {
      await Users.create(user);
      res.json({
        success: true,
        message: "Se ha creado el usuario correctamente.",
      });
    } else {
      throw Error;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: errors.errors,
    });

    next();
  }
};
