const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const router = express.Router();

const dbURI = require("../../config/keys").mongoURI;

// // Create mongo connection
const conn = mongoose.createConnection(dbURI);

// // Initialize gfs
let gfs;

conn.once("open", () => {
   // Init stream
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection("uploads");
   console.log("GridFS Connected");
});

// //Import models
var User = require("../../models/User");
var Product = require("../../models/Product");

// Create storage engine
const storage = new GridFsStorage({
   url: dbURI,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename =
               buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: "uploads"
            };
            resolve(fileInfo);
         });
      });
   }
});

const upload = multer({ storage });

// @route   Post api/fileUpload/:productID
// @desc    Upload image
// @access  public
router.post("/:productID", upload.single("file"), (req, res) => {
   Product.findOne({ _id: req.params.productID }, function(err, db) {
      if (err) throw err;

      db.image = req.file;

      db.save();
   })
      .then(file => res.json({ file }))
      .catch(err => res.json({ errror: err }));
});

// @route   Post api/fileUpload/show/:filename
// @desc    Show image
// @access  public
router.get("/show/:filename", (req, res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
         return res.status(404).json({
            err: "No file exists"
         });
      }

      // Check if image
      if (
         file.contentType === "image/jpeg" ||
         file.contentType === "image/png"
      ) {
         // Read output to browser
         const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res);
      } else {
         res.status(404).json({
            err: "Not an image"
         });
      }
   });
});

module.exports = router;
