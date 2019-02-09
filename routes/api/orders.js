// CRUD mongoDB
const express = require("express");
const _ = require("lodash");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, __dirname + '/uploads');
    cb(null, './slipImg');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//Import models
const Order = require("../../models/Order");

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

// @route  GET api/orders/
//test router
router.get('/test_add_order', function (req, res) {
  res.send('Hello World Test add order')
});

// @route   GET api/orders/
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

// @route   POST api/orders/
//add order
//Add product and Upload picture
router.post('/add_order', function (req, res) {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yy = today.getFullYear();
  const h = today.getHours();
  const mintue = today.getMinutes();
  const sec = today.getSeconds();

  const date_formated = dd+"/"+mm+"/"+yy +" " +h+":"+mintue+":"+sec
  const new_order = new Order();
  new_order.storeId = req.body.storeId
  new_order.products = req.body.products
  new_order.customerName = req.body.customerName
  new_order.comment = req.body.comment
  new_order.orderStatus = req.body.orderStatus
  new_order.URL = req.body.URL
  new_order.bankID = req.body.bankID
  new_order.deliveryType = req.body.deliveryType
  new_order.paymentStatus = req.body.paymentStatus
  new_order.trackingNumber = req.body.trackingNumber
  new_order.createdAt = date_formated

  new_order.save(function (err) {
    if (err) return res.status(400).json({
      'Message': 'Unable to ADD the order!!',
      'error': err
    });
    res.status(200).json({
      'Message': 'Add New Order successfully',
      'Data id': new_order.customerName,
      'Data obj': new_order
    });
  });
});

// @route   PUT api/orders/
//add order
// Upload slip
router.put('/upload/slip/:id',upload.single('paymentSlip'), function (req, res) {
  console.log(req.file);
  const paytime_now = new Date();
  const dd = paytime_now.getDate();
  const mm = paytime_now.getMonth() + 1;
  const yy = paytime_now.getFullYear();
  const h = paytime_now.getHours();
  const mintue = paytime_now.getMinutes();
  const sec = paytime_now.getSeconds();

  const payment_time = dd+"/"+mm+"/"+yy +" " +h+":"+mintue+":"+sec
  Order.findByIdAndUpdate(req.params.id, { $set:{ "paymentSlip": req.file.path, "paymentTime":payment_time }}, function (err, order) {
    if (err) return res.status(400).json({
      'Message': 'Unable to UPDATE the order!!',
      'error': err
    });
    res.status(200).json({
      'Message': 'Order paymentSlip updated.',
      'Order ID': req.params.id,
      'URL paymentSlip':  "localhost:8000/uploads/slipImg/"+req.file.filename
    });
  });
});

// @route  GET api/orders/
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

// @route  PUT api/orders/
//update order
router.put('/update_order/:id', function (req, res) {
  Order.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, order) {
    if (err) return res.status(400).json({
      'Message': 'Unable to UPDATE the order!!',
      'error': err
    });
    res.status(200).json({
      'Message': 'Order updated.',
      'Order ID': req.params.id,
      'Update order': req.body
    });
  });
});

// @route  PUT api/orders/
//update status order
router.put('/update_status/:status', function (req, res) {
  if (req.body.id == null) {
      res.status(400).json({ 
        'Error' : 'Can\'t update status order',
        'Message': 'Your array ID is null' });
  }
  const arr = Object.values(req.body.id);
  arr.forEach(function (id) {
    Order.findByIdAndUpdate(id, { $set: { "orderStatus": req.params.status} }, function (err, order) {
      if (err) return res.status(400).json({
        'Message': 'Unable to UPDATE the status!!',
        'err': err
      });
    });
  });
  
  res.status(200).json({
      'Message': 'Order updated.',
      'Status order': req.params.status
    });
});

module.exports = router;
