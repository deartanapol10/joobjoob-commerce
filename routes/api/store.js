// CRUD mongoDB
const express = require("express");

const router = express.Router();

//Import models
var User = require("../../models/User");
var Store = require("../../models/Store");


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

// @route   POST api/store/
// @desc    Post a store
// @access  public
router.post('/add_store', function(req, res){
  const new_store = new Store(req.body);
  new_store.save()
    .then(new_store => {
    console.log(new_store)    
    res.status(200).json({'new_store': 'New Store Created Successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save the data into database");
    });
  })


module.exports = router;
