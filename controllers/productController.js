const Products = require("../models/Products");
const { validationResult } = require("express-validator");

// Get Product
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.body.id;

    const product = await Products.findByPk(id);

    res.json({
      success: true,
      product,
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

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Products.findAll();

    res.json({
      success: true,
      products,
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

// Add Product
exports.newProduct = async (req, res, next) => {
  const errors = validationResult(req);
  const product = req.body;

  try {
    if (!errors.errors.length) {
      await Products.create(product);
      res.json({
        success: true,
        message: "Se ha creado el producto correctamente.",
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

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.body.id;

    const product = await Products.findByPk(id);
    await product.destroy();

    res.json({
      success: true,
      message: "Se ha eliminado el producto correctamente",
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

// Update Product
exports.updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  const { id, name, stock, medide } = req.body;
  try {
    if (!errors.errors.length) {
      const product = await Products.findByPk(id);
      product.name = name;
      product.stock = stock;
      product.medide = medide;
      await product.save();

      res.json({
        success: true,
        message: "Se ha actualizado el producto correctamente",
      });
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    res
      .json({
        success: false,
        error: errors.errors,
      })
      .status(400);
    next();
  }
};
