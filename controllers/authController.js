const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { validationResult } = require("express-validator");

// Login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    await res
      .status(401)
      .json({ success: false, error: { msg: "El usuario no existe" } });
    next();
  } else {
    const verifyPass = bcrypt.compareSync(password, user.password);
    if (!verifyPass) {
      res
        .status(401)
        .json({ success: false, error: { msg: "Contraseña incorrecta" } });
      next();
    }

    const token = jwt.sign(
      {
        id: user.id,
        nameUser: user.nameUser,
        name: user.name,
        last_name: user.last_name,
        dni: user.dni,
        phone: user.phone,
        email: user.email,
        is_active: user.is_active,
        roleId: user.roleId,
      },
      "KEY_SECRET"
    );

    try {
      if (!errors.errors.lenght) {
        res
          .json({
            success: true,
            token,
          })
          .status(200);
      } else {
        throw Error;
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: errors.errors,
      });

      next();
    }
  }
};
