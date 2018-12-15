const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  facebookId: {
    type: Schema.Types.ObjectId
  },
  category: [
    {
      main: String,
      sub: [String]
    }
  ],
  address: {
    type: [String]
  },
  phoneNumber: {
    type: String
  },
  bankAccount: [
    {
      bankName: {
        type: String,
        required: true
      },
      ownerName: {
        type: String,
        required: true
      },
      accountNumber: {
        type: String,
        required: true
      }
    }
  ],
  store: [
    {
      storeId: {
        type: Schema.Types.ObjectId,
        ref: "store"
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  deletedFlag: {
    type: Boolean
  }
});

module.exports = User = mongoose.model("user", UserSchema);
