const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
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
});

module.exports = Product = mongoose.model("product", ProductSchema);
