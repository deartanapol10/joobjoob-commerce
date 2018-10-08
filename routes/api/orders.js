// CRUD mongoDB
const express = require("express");
const _ = require("lodash");

const router = express.Router();

//Import models
var User = require("../../models/User");

// @route   GET api/orders/
// @desc    Get all orders
// @access  public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user.order);
    })
    .catch(err => res.status(400).json(err));
});

// @route   Post api/order/
// @desc    Create a order
// @access  public
router.post("/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    const orderField = {};
    orderField.product = [];
    const slicedProduct = req.body.productID.split(",");
    const slicedQuantity = req.body.quantity.split(",");
    const slicedSize = req.body.size.split(",");
    const slicedDescription = req.body.description.split(",");

    for (i = 0; i < slicedProduct.length; i++) {
      var productField = {
        productID: slicedProduct[i],
        quantity: slicedQuantity[i],
        size: slicedSize[i],
        description: slicedDescription[i]
      };

      orderField.product.push(productField);
    }

    user.order.push(orderField);

    user.save().then(user => {
      const orderLength = user.order.length;
      const URL = "http://shippee.com/order/" + user.order[orderLength - 1]._id;
      user.order[orderLength - 1].URL = URL;

      user.save().then(user => {
        res.json(user.order);
      });
    });
  });
});

// @route   PATCH api/order/
// @desc    Update a order
// @access  public
router.patch("/:id/:orderID", (req, res) => {
  var body = req.body;

  User.findById(req.params.id).then(user => {
    if (
      user.order.filter(order => order._id.toString() === req.params.orderID)
        .length === 0
    ) {
      return res.json({ error: "No order map" });
    }

    const orderField = body;

    //Find index key
    const indexValueOrder = user.order
      .map(item => item._id.toString())
      .indexOf(req.params.orderID);

    user.order[indexValueOrder] = orderField;

    user.save().then(user => {
      res.json(user.order);
    });
  });
});

module.exports = router;
