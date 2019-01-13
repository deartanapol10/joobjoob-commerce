// CRUD mongoDB
const express = require("express");
const _ = require("lodash");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Import models
// var User = require("../../models/User");
var Order = require("../../models/Order");

// @route   GET api/orders/
// @desc    Get all orders
// @access  private
// @url     /api/orders
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        res.json(user.order);
      })
      .catch(err => res.status(400).json(err));
  }
);

//test router
router.get('/test_add_order', function (req, res) {
  res.send('Hello World Test add order')
});

//get orders
router.get('/get_order/:id', function (req, res) {
  if (req.params.id != null) {
    Order.findById(req.params.id).then(order => {
      res.json(order);
    });
  }
  else {
    return res.json({ error: "No order" });
  }
});

//add order
router.post('/add_order', function (req, res) {
  const new_order = new Order();
  // new_order.save()
  //   .then(new_order => {
  //   res.status(200).json({'New Order': 'Add New Order successfully'});
  //   })
  //   .catch(err => {
  //   res.status(400).send("Unable to add the order!!");
  //   });
  // })
  //----------------------------------------------------//
  new_order.storeId = req.body.storeId
  new_order.products = req.body.products
  new_order.customerName = req.body.customerName
  new_order.comment = req.body.comment
  new_order.orderStatus = req.body.orderStatus
  new_order.URL = req.body.URL
  new_order.bankID = req.body.bankID
  new_order.deliveryType = req.body.deliveryType
  new_order.paymentSlip = req.body.paymentSlip
  new_order.paymentStatus = req.body.paymentStatus
  new_order.trackingNumber = req.body.trackingNumber
  new_order.createdAt = req.body.createdAt
  new_order.expiredAt = req.body.expiredAt
  new_order.updatedAt = req.body.updatedAt
  new_order.deletedFlag = req.body.deletedFlag
  new_order.save(function (err) {
    res.status(200).json({
      'Message': 'Add New Order successfully',
      'Data id': new_order.customerName,
      'Data obj': new_order
    });
  });
});

// del order
router.get('/del_order/:id', function (req, res) {
  if (req.params.id != null) {
    Order.findById(req.params.id).then(order => {
      order.remove();
      res.status(200).json({ 'Message': 'Order deleted.' });
    });
  }
  else {
    res.status(400).send("Unable to DELETE the order!!");
  }
});

//update order
router.put('/update_order/:id', function (req, res) {
  Order.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, order) {
    if (err) return res.status(400).json({
      'Message': 'Unable to UPDATE the order!!',
      'err': err
    });
    res.status(200).json({
      'Message': 'Order updated.',
      'Order ID': req.params.id,
      'Update order': req.body
    });
  });
});

module.exports = router;
