const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Store Schema
const StoreSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  storeId: {
    type: Schema.Types.ObjectId
  },
  storeName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  deletedFlag: {
    type: Boolean,
    default: false
  }
});

module.exports = Store = mongoose.model("store", StoreSchema);
