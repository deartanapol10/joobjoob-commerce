// CRUD mongoDB
const express = require("express");
const datetime = require('node-datetime');
const router = express.Router();
const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, __dirname + '/uploads');
    cb(null, './uploads');
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
const Product = require("../../models/Product");


// @route   POST api/product/
//Add product and Upload picture
router.post('/add_product', upload.single('productImage'), function (req, res, next) {
  console.log(req.file);
  const new_product = new Product();
  new_product.storeId = req.body.storeId
  new_product.productName = req.body.productName
  new_product.categoryGroup = req.body.categoryGroup
  new_product.detail = req.body.detail
  new_product.price = req.body.price
  new_product.createdAt = Date.now()
  new_product.productImage = req.file.path
  new_product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Created product successfully",
        createdProduct: {
          ProductName: result.productName,
          Data: new_product
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        'Message': 'Unable to ADD the porduct!!',
        error: err
      });
    });
});

// @route   POST api/product/
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
// router.post('/add_product', function (req, res) {
//   const new_product = new Product();
//   new_product.storeId = req.body.storeId
//   new_product.productName = req.body.productName
//   new_product.categoryGroup = req.body.categoryGroup
//   new_product.detail = req.body.detail
//   new_product.price = req.body.price
//   new_product.createdAt = Date.now()
//   new_product.save(function (err) {
//     if (err) return res.status(400).json({
//       'Message': 'Unable to ADD the porduct!!',
//       'err': err
//     });
//     res.status(200).json({
//       'Message': 'Add New Product successfully',
//       'Data id': new_product.productName,
//       'Data obj': new_product
//     });
//   });
// });

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

module.exports = router;
