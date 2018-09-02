// CRUD mongoDB
const express = require("express");

const router = express.Router();

//Import models
var User = require("../../models/User");

// @route   GET api/product/
// @desc    Get all products
// @access  public
router.get("/:id/:name", (req, res) => {
  User.findById(req.params.id).then(user => {
    if (
      user.store.filter(store => store.name === req.params.name).length === 0
    ) {
      res.json({ error: "No store map" });
    }

    //Find index key
    const indexValueCategory = user.store
      .map(item => item.name)
      .indexOf(req.params.name);

    res.json(user.store[indexValueCategory].product);
  });
});

// @route   POST api/product/
// @desc    Post a product
// @access  public
router.post("/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    if (
      user.store.filter(store => store.name === req.body.storeName).length === 0
    ) {
      res.json({ error: "No store map" });
    }

    //Find index key
    const indexValueStore = user.store
      .map(item => item.name)
      .indexOf(req.body.storeName);

    const productField = {
      name: req.body.name,
      price: req.body.price
    };

    user.store[indexValueStore].product.push(productField);

    user.save().then(user => {
      res.json(user.store[indexValueStore].product);
    });
  });
});

module.exports = router;
