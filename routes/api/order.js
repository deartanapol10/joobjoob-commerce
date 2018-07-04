// CRUD mongoDB
const express = require("express");

const router = express.Router();

//Import models
var Order = require("../models/Order");
var User = require("../models/User");

//-----------------
// ---- UPDATE ----
//-----------------
//Update each order route
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
   Order.findById(req.params.id, (err, order) => {
      if (order.name != req.user._id) {
         req.flash("danger", "Not Authorized");
         res.redirect("/");
      }

      res.render("edit_order", {
         title: "Edit Order",
         order: order
      });
   });
});

//Update Submit post route
router.post("/edit/:id", (req, res) => {
   var order = {};
   order.name = req.body.name;
   order.contact = req.body.contact;
   order.product = req.body.product;

   var query = {
      _id: req.params.id
   };

   Order.update(query, order, err => {
      if (err) throw err;
      req.flash("success", "Order is now Updated!");
      res.redirect("/");
   });
});

//-----------------
// ------ ADD ------
//-----------------
//Add order route
router.get("/add", ensureAuthenticated, (req, res) => {
   res.render("add_order", {
      title: "Add Order"
   });
});

//Add Submit post route
router.post("/add", (req, res) => {
   var order = new Order({
      name: req.body.name,
      contact: req.body.contact,
      product: req.body.product
   });

   // req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody("contact", "Contact is required").notEmpty();
   req.checkBody("product", "Product is required").notEmpty();

   var errors = req.validationErrors();

   if (errors) {
      console.log(errors);
      res.render("add_order", {
         title: "(Error) Add Order Again !",
         order: order,
         errors: errors
      });
   } else {
      // order.name = req.body.name;
      order.name = req.user._id;
      order.contact = req.body.contact;
      order.product = req.body.product;

      order.save(err => {
         if (err) throw err;
         req.flash("success", "Order is now Added!");
         res.redirect("/");
      });
   }
});

//-----------------
// ---- DELETE ----
//-----------------
//Delete order
router.delete("/:id", (req, res) => {
   if (!req.user._id) {
      res.status(500).send(); //error.. can't login
   }

   var query = { _id: req.params.id };

   Order.findById(req.params._id, (err, order) => {
      if (order.name != req.user._id) {
         res.status(500).send();
      }

      order.remove(query, err => {
         return console.log(err);
      });
      res.send("Success!");
   });
});

//-----------------
// SHOW each Order
//-----------------
//Show each order routes
router.get("/:id", (req, res) => {
   Order.findById(req.params.id, (err, order) => {
      User.findById(order.name, (err, user) => {
         res.render("show_order", {
            order: order,
            name: user.name
         });
      });
   });
});

//Access control
function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   } else {
      req.flash("danger", "Please Login");
      res.redirect("/users/login");
   }
}

module.exports = router;
