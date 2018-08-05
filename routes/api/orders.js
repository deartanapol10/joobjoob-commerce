// CRUD mongoDB
const express = require("express");
const _ = require("lodash");

const router = express.Router();

//Import models
var Order = require("../../models/Order");
var User = require("../../models/User");

// @route   GET api/order/
// @desc    Get all orders
// @access  public
router.get("/", (req, res) => {
  Order.find()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => res.status(400).json(err));
});

// @route   Post api/order/
// @desc    Create a order
// @access  public
router.post("/", (req, res) => {
  const orderField = {};

  if (req.body.userid) orderField.userid = req.body.userid;

  orderField.orders = {};
  if (req.body.productid) orderField.orders.productid = req.body.productid;
  if (req.body.quantity) orderField.orders.quantity = req.body.quantity;
  if (req.body.size) orderField.orders.size = req.body.size;
  if (req.body.bankAccount) orderField.bankAccount = req.body.bankAccount;

  new Order(orderField)
    .save()
    .then(order => {
      const url = { URL: "http://shippee.com/order/" + order._id };
      orderField.URL = "http://shippee.com/order/" + order._id;
      Order.findOneAndUpdate(
        { _id: order._id },
        { $set: orderField },
        { new: true }
      ).then(newOrder => {
        res.json(newOrder);
      });
    })
    .catch(err => res.json(err));
});

// @route   PATCH api/order/
// @desc    Update a order
// @access  public
router.patch("/:orderID", (req, res) => {
  var body = req.body;

  Order.findOneAndUpdate(
    { _id: req.params.orderID },
    { $set: body },
    { new: true }
  )
    .then(order => {
      res.json(order);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
