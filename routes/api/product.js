// CRUD mongoDB
const express = require("express");

const router = express.Router();

//Import models
var Product = require("../../models/Product");
var User = require("../../models/User");

// @route   GET api/product/
// @desc    Get all products
// @access  public
router.get("/", (req, res) => {
  Product.find().then(products => {
    res.json(products);
  });
});

// @route   POST api/product/
// @desc    Post a product
// @access  public
router.post("/", (req, res) => {
  const productField = {};

  if (req.body.userid) productField.userid = req.body.userid;
  if (req.body.storeName) productField.storeName = req.body.storeName;
  if (req.body.name) productField.name = req.body.name;
  if (req.body.price) productField.price = req.body.price;

  new Product(productField).save().then(product => {
    res.json(product);
  });
});

module.exports = router;
