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
  store: [
    {
      id: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String,
        required: true
      },
      product: [
        {
          id: {
            type: Schema.Types.ObjectId
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
          image: {
            type: String
          },
          createdAt: {
            type: Date
          },
          updatedAt: {
            type: Date
          }
        }
      ]
    }
  ],
  order: [
    {
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "product"
          },
          quantity: {
            type: Number,
            required: true
          },
          size: {
            type: String
          },
          description: {
            type: String
          }
        }
      ],
      customerName: {
        type: String
      },
      comment: {
        type: String
      },
      orderStatus: {
        type: String,
        default: "created"
      },
      URL: {
        type: String
      },
      bankID: {
        type: Schema.Types.ObjectId,
        ref: "user.bankAccount"
      },
      deliveryType: {
        type: String
      },
      paymentSlip: {
        //Slip image
        type: String
      },
      paymentStatus: {
        type: String,
        default: false
      },
      paymentTime: {
        type: Date
      },
      trackingNumber: {
        type: Date
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      expiredAt: {
        type: Date,
        default: new Date(+new Date() + 2 * 24 * 60 * 60 * 1000)
      },
      updatedAt: {
        type: Date
      }
    }
  ],
  deliveryType: [String],
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
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

module.exports = User = mongoose.model("user", UserSchema);
