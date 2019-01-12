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
          id: user.id,
          name: user.username
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

// @route   GET api/user/info
// @desc    Get user info
// @access  Private
router.get(
  "/info",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => res.json(user));
  }
);

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

// @route   POST api/user/bankAccount
// @desc    Add a bankaccount
// @access  Private
router.post(
  "/bankAccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      User.findById(req.user.id).then(user => {
        if (
          user.bankAccount
            .map(row => row.accountNumber)
            .indexOf(req.body.accountNumber) !== -1
        ) {
          return res.status(400).json({ error: "Already have an account" });
        }
        const bankField = {};
        if (req.body.bankName) bankField.bankName = req.body.bankName;
        if (req.body.ownerName) bankField.ownerName = req.body.ownerName;
        if (req.body.accountNumber)
          bankField.accountNumber = req.body.accountNumber;
        //Update
        user.bankAccount.push(bankField);

        user.save().then(user => {
          res.json(user.bankAccount);
        });
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
);

// @route   GET api/user/bankAccount
// @desc    get all bank account
// @access  Private
router.get(
  "/bankAccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      res.json(user.bankAccount);
    });
  }
);

// @route   DELETE api/user/bankAccount
// @desc    delete a bankaccount
// @access  Private
router.delete(
  "/bankAccount/:accountNumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (user.bankAccount.length === 0) {
        return res.status(400).json({ error: "Don't have any bankaccount" });
      } else if (
        user.bankAccount
          .map(row => row.accountNumber)
          .indexOf(req.params.accountNumber) === -1
      ) {
        return res.status(400).json({ error: "Wrong account number" });
      }
      // Get remove index
      const removeIndex = user.bankAccount
        .map(item => item.accountNumber.toString())
        .indexOf(req.params.accountNumber);

      // Splice out of array
      user.bankAccount.splice(removeIndex, 1);

      // Save
      user.save().then(user => res.json(user.bankAccount));
    });
  }
);

// @route   Update api/user/bankAccount
// @desc    delete a bankaccount
// @access  Private
router.patch(
  "/bankAccount/:accountNumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.bankAccount.filter(
          row => row.accountNumber === req.params.accountNumber
        ).length === 0
      ) {
        return res.status(400).json({ error: "Wrong account number" });
      }

      // Get index
      const index = user.bankAccount
        .map(item => item.accountNumber)
        .indexOf(req.params.accountNumber);

      const updated = {
        accountNumber: req.body.accountNumber
          ? req.body.accountNumber
          : user.bankAccount[index].accountNumber,
        ownerName: req.body.ownerName
          ? req.body.ownerName
          : user.bankAccount[index].ownerName,
        bankName: req.body.bankName
          ? req.body.bankName
          : user.bankAccount[index].bankName
      };

      user.bankAccount[index] = updated;

      user.save().then(user => res.json(user.bankAccount));
    });
  }
);

router.get(
  "/delivery",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      res.json(user.delivery);
    });
  }
);

router.post(
  "/delivery",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.delivery
          .map(row => row.deliveryName)
          .indexOf(req.body.deliveryName) !== -1
      ) {
        return res
          .status(400)
          .json({ error: `${req.body.deliveryName} already exists` });
      }
      const deliveryField = {};
      if (user) {
        if (req.body.deliveryName)
          deliveryField.deliveryName = req.body.deliveryName;
        if (req.body.price) deliveryField.price = req.body.price;
        //Update
        user.delivery.push(deliveryField);

        user.save().then(user => {
          res.json(user.delivery);
        });
      }
    });
  }
);

router.delete(
  "/delivery/:deliveryName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (user.delivery.length === 0) {
        return res.status(400).json({ error: "Don't have any delivery" });
      } else if (
        user.delivery
          .map(row => row.deliveryName)
          .indexOf(req.params.deliveryName) === -1
      ) {
        return res
          .status(400)
          .json({ error: `${req.params.deliveryName} does not exists` });
      }
      // Get remove index
      const removeIndex = user.delivery
        .map(item => item.deliveryName.toString())
        .indexOf(req.params.deliveryName);

      // Splice out of array
      user.delivery.splice(removeIndex, 1);

      // Save
      user.save().then(user => res.json(user.delivery));
    });
  }
);

router.patch(
  "/delivery/:deliveryName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.delivery.filter(
          row => row.deliveryName === req.params.deliveryName
        ).length === 0
      ) {
        return res
          .status(400)
          .json({ error: `${req.params.deliveryName} does not exists` });
      }

      // Get index
      const index = user.delivery
        .map(item => item.deliveryName)
        .indexOf(req.params.deliveryName);

      const updated = {
        deliveryName: req.body.deliveryName
          ? req.body.deliveryName
          : user.delivery[index].deliveryName,
        price: req.body.price ? req.body.price : user.delivery[index].price
      };

      user.delivery[index] = updated;

      user.save().then(user => res.json(user.delivery));
    });
  }
);

// @route   GET api/user/category
// @desc    Get all category
// @access  Private
router.get(
  "/category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => res.json(user.category));
  }
);

// @route   POST api/user/category
// @desc    Create a category
// @access  Private
router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (user.category.map(row => row.main).indexOf(req.body.main) !== -1) {
        return res
          .status(400)
          .json({ error: `${req.body.main} already exists` });
      }
      const field = {};
      if (req.body.main && req.body.sub) {
        field.main = req.body.main;
        field.sub = req.body.sub.split(",");
      }

      //Update
      user.category.push(field);

      user.save().then(user => {
        res.json(user.category);
      });
    });
  }
);

router.delete(
  "/category/:main",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (user.category.length === 0) {
        return res.status(400).json({ error: "Don't have any category" });
      } else if (
        user.category.map(row => row.main).indexOf(req.params.main) === -1
      ) {
        return res.status(400).json({ error: "Wrong category name" });
      }
      // Get remove index
      const removeIndex = user.category
        .map(item => item.main)
        .indexOf(req.params.main);

      // Splice out of array
      user.category.splice(removeIndex, 1);

      // Save
      user.save().then(user => res.json(user.category));
    });
  }
);

// //Login form
// router.get("/login", (req, res) => {
//    res.render("login");
// });

// //Login process
// router.post("/login", (req, res, next) => {
//    passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/users/login",
//       failureFlash: true
//    })(req, res, next);
// });

// //Logout
// router.get("/logout", (req, res) => {
//    req.logout();
//    req.flash("success", "You are logged out");
//    res.redirect("/users/login");
// });

module.exports = router;
