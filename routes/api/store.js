// CRUD mongoDB
const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");

//Import models
var Store = require("../../models/Store");
var User = require("../../models/User");

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
router.put(
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
