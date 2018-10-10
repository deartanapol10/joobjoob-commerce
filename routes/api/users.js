const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

//Import models
var User = require("../../models/User");

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const errors = {};

  const fields = {};
  if (req.body.username) fields.username = req.body.username;
  if (req.body.password) fields.password = req.body.password;
  if (req.body.email) fields.email = req.body.email;
  if (req.body.firstname) fields.firstname = req.body.firstname;
  if (req.body.lastname) fields.lastname = req.body.lastname;

  fields.store = {};
  // if (req.body.storeId) fields.store.id = req.body.storeId;
  // if (req.body.storeName) fields.store.name = req.body.storeName;

  if (req.body.address) fields.address = req.body.address;
  if (req.body.phoneNumber) fields.phoneNumber = req.body.phoneNumber;
  if (req.body.bankAccount) fields.bankAccount = req.body.bankAccount;
  fields.createdAt = Date.now();
  // fields.updatedAt = Date.now();

  User.findOne({ username: req.body.username }).then(profile => {
    if (profile) {
      //User exist
      errors.username = "Username exist";
      res.status(400).json(errors);
    } else {
      //Create
      const newUser = new User(fields);
      // .save()
      // .then(profile => res.json(profile));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const errors = {};

  const username = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    username
  }).then(user => {
    //Check for user
    if (!user) {
      errors.username = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched

        const payload = {
          // Create jwt payload (put whatever you want into payload)
          id: user.id
          // name: user.name,
          // avatar: user.avatar
        };

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/user/edit/:username
// @desc    Edit user
// @access  Private
router.post(
  "/edit/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const fields = {};
    if (req.body.username) fields.username = req.body.username;
    if (req.body.password) fields.password = req.body.password;
    if (req.body.email) fields.email = req.body.email;
    if (req.body.firstname) fields.firstname = req.body.firstname;
    if (req.body.lastname) fields.lastname = req.body.lastname;

    fields.store = {};
    // if (req.body.storeId) fields.store.id = req.body.storeId;
    // if (req.body.storeName) fields.store.name = req.body.storeName;

    if (req.body.address) fields.address = req.body.address;
    if (req.body.phoneNumber) fields.phoneNumber = req.body.phoneNumber;
    if (req.body.bankAccount) fields.bankAccount = req.body.bankAccount;
    // fields.createdAt = Date.now();
    fields.updatedAt = Date.now();

    User.findOne({ username: req.params.username }).then(profile => {
      if (profile) {
        //Update
        User.findOneAndUpdate(
          { username: req.params.username },
          { $set: fields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        errors.username = "No username";
        res.status(400).json(errors);
      }
    });
  }
);

router.post(
  "/bankAccount/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const bankField = {};
    if (req.body.bankName) bankField.bankName = req.body.bankName;
    if (req.body.ownerName) bankField.ownerName = req.body.ownerName;
    if (req.body.accountNumber)
      bankField.accountNumber = req.body.accountNumber;

    User.findById(req.params.id).then(user => {
      if (user) {
        //Update
        user.bankAccount.push(bankField);

        user.save().then(user => {
          res.json(user.bankAccount);
        });
      }
    });
  }
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
);

module.exports = router;
