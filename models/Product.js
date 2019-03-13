const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "store"
  },
  productName: {
    type: String,
    required: true
  },
  categoryGroup: {
    type: String
  },
  detail: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },

  productImage: { type: String, required: true },

  createdAt: {
    type: String,
    default: new Date().toLocaleString()
  },
  updatedAt: {
    type: String
  },
  deletedFlag: {
    type: Boolean
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);