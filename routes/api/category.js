// CRUD mongoDB
const express = require("express");
const _ = require("lodash");

const router = express.Router();

//Import models
var User = require("../../models/User");

// @route   GET api/category/
// @desc    Get a category
// @access  public
router.get("/:id/:main", (req, res) => {
  User.findById(req.params.id).then(user => {
    if (
      user.category.filter(category => category.main === req.params.main)
        .length === 0
    ) {
      res.json({ error: "No category map" });
    }

    //Find index key
    const indexValueCategory = user.category
      .map(item => item.main)
      .indexOf(req.params.main);

    res.json(user.category[indexValueCategory]);
  });
});

// @route   POST api/category/
// @desc    Create a category
// @access  public
router.post("/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    if (
      user.category.filter(category => category.main === req.body.main).length >
      0
    ) {
      res.json({ error: "This category's already exist" });
    }
    const categoryField = {
      main: req.body.main,
      sub: req.body.sub.split(",")
    };

    user.category.unshift(categoryField);

    user.save().then(user => {
      res.json(user);
    });
  });
});

module.exports = router;
