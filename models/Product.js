const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
<<<<<<< HEAD
   userid: {
      type: Schema.Types.ObjectId,
      ref: "user"
   },
   storeName: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   detail: {
      type: String
   },
   price: {
      type: Number,
      required: true
   },
   createdAt: {
      type: Date
   },
   updatedAt: {
      type: Date
   }
=======
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  storeName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
>>>>>>> 3f6d909d73191a563848509e917247ba36dbbf10
});

module.exports = Product = mongoose.model("product", ProductSchema);
