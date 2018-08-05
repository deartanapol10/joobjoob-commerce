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
  store: [
    {
      id: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String
        //required: true
      },
      category: [
        {
          main: String,
          sub: [String]
        }
      ],
      product: [
        {
          id: {
            type: Schema.Types.ObjectId
          },
          name: {
            type: String,
            required: true
          },
          category: {
            type: String
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
        }
      ]
    }
  ],
  order: [
    {
      product: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "user.store.product"
          },
          quantity: {
            type: Number,
            required: true
          },
          size: {
            type: String,
            required: true
          },
          description: {
            type: String
          }
        }
      ],
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
      bankAccount: {
        type: String,
        required: true
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
      updatedAt: {
        type: Date
      }
    }
  ],
  address: {
    type: [String]
  },
  phoneNumber: {
    type: String
  },
  bankAccount: {
    type: [String]
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

module.exports = User = mongoose.model("user", UserSchema);
