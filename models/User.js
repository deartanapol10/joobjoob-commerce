const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
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
  delivery: [
    {
      deliveryName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
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
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
