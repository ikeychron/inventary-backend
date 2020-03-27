const Users = require("../models/Users");

// Get User
exports.getUser = async (req, res) => {
  res.send("Hola");
};

// Add User
exports.newUser = async (req, res, next) => {
  const user = req.body;

  try {
    await Users.create(user);
    res.json({
      success: true,
      message: "Se ha creado el usuario correctamente."
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error
    });
    next();
  }
};
