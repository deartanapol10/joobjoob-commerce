// CRUD mongoDB
const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");

//Import models
var Store = require("../../models/Store");
var User = require("../../models/User");
var Store = require("../../models/Store");


// @route   GET api/store/
// @desc    Get all stores
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Store.find({ userId: req.user.id }).then(store => {
      res.json(store);
    });
  }
);

// @route   GET api/store/
// @desc    Get a store
// @access  private
router.get(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.storeId)) {
      Store.findById(req.params.storeId).then(store => {
        if (!store) {
          return res.json("Can't find the store");
        }
        res.json(store);
      });
    } else {
      res.json({ error: "storeId is invalid" });
    }
  }
);

// @route   POST api/store/
// @desc    Create a store
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Store.findOne({ storeName: req.body.storeName }).then(store => {
      if (store) {
        return res.json({ error: "storeName already exist" });
      }
      const newStore = new Store({
        userId: req.user.id,
        storeName: req.body.storeName
      });
      newStore.save().then(store => res.json(store));
    });
  }
);

// @route   PUT api/store/
// @desc    Update a store
// @access  private
router.patch(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body) {
      Store.findByIdAndUpdate(req.params.storeId, req.body, { new: true }).then(
        store => {
          if (store) {
            res.json(store);
          }
          res.json({ error: " Can't find the store" });
        }
      );
    }
  }
);

// @route   DELETE api/store/
// @desc    Delete a store
// @access  private
router.delete(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Store.findByIdAndDelete(req.params.storeId).then(store => {
      if (store) {
        return res.json(store);
      }
      res.json({ error: "Can't find this store" });
    });
  }
);

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
