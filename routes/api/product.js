// CRUD mongoDB
const express = require("express");
const datetime = require('node-datetime');
const router = express.Router();

//Import models
// var User = require("../../models/User");
const Product = require("../../models/Product");


//Test router
router.get('/test_product', function (req, res) {
  res.send('Hello World Test product')
});
// @route   GET api/product/
//Get product
router.get('/get_product/:id', function (req, res) {
  if (req.params.id != null) {
    Product.findById(req.params.id).then(product => {
      res.json(product);
    });
  }
  else {
    return res.json({ error: "No product" });
  }
});
// @route   POST api/product/
//Add product
router.post('/add_product', function (req, res){
  const new_product = new Product();
  new_product.storeId = req.body.storeId
  new_product.productName = req.body.productName
  new_product.categoryGroup = req.body.categoryGroup
  new_product.detail = req.body.detail
  new_product.price = req.body.price
  new_product.image = req.body.image
  new_product.createdAt = Date.now()
  // new_product.updatedAt = req.body.updatedAt
  // new_product.deletedFlag = req.body.deletedFlag
  new_product.save(function (err) {
    if (err) return res.status(400).json({
      'Message': 'Unable to ADD the porduct!!',
      'err': err
    });
    res.status(200).json({
      'Message': 'Add New Product successfully',
      'Data id': new_product.productName,
      'Data obj': new_product
    });
  });
});

// @route   GET api/product/
// Del product
router.get('/del_product/:id', function (req, res) {
  if (req.params.id != null) {
    Product.findById(req.params.id).then(product => {
      product.remove();
      res.status(200).json({ 'Message': 'Product deleted.' });
    });
  }
  else {
    res.status(400).send("Unable to DELETE the product!!");
  }
});

// @route   PUT api/product/
// Update product
router.put('/update_product/:id', function (req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
    // updatedAt = Date.now();
    if (err) return res.status(400).json({
      'Message': 'Unable to UPDATE the product!!',
      'err': err
    });
    res.status(200).json({
      'Message': 'Product updated.',
      'Product ID': req.params.id,
      'Update product': req.body
    });
  });
});


// // @route   GET api/product/
// // @desc    Get all products
// // @access  public
// router.get("/:id/:name", (req, res) => {
//   User.findById(req.params.id).then(user => {
//     if (
//       user.store.filter(store => store.name === req.params.name).length === 0
//     ) {
//       res.json({ error: "No store map" });
//     }

//     //Find index key
//     const indexValueCategory = user.store
//       .map(item => item.name)
//       .indexOf(req.params.name);

//     res.json(user.store[indexValueCategory].product);
//   });
// });

// // @route   POST api/product/
// // @desc    Post a product
// // @access  public
// router.post("/:id", (req, res) => {
//   User.findById(req.params.id).then(user => {
//     const productField = {
//       user: req.params.id,
//       productName: req.body.name,
//       price: req.body.price
//     };

//     const newProduct = new Product(productField);

//     newProduct.save().then(product => {
//       res.json(product);
//     });
//   });
// });

module.exports = router;
