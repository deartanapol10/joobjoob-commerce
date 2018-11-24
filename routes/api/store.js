// CRUD mongoDB
const express = require("express");

const router = express.Router();

//Import models
var User = require("../../models/User");

// @route   GET api/product/
// @desc    Get all products
// @access  public
router.get("/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    res.json(user.store);
  });
});

// @route   POST api/product/
// @desc    Post a product
// @access  public
router.post("/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    var storeField = {
      name: req.body.name
    };

    user.store.push(storeField);

    user.save().then(user => {
      res.json(user.store);
    });
  });
});

module.exports = router;
