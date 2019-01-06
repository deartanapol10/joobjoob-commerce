const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Order Scheme
const OrderSchema = new Schema({
  // order: [
  //   {
      storeId: {
        type: Schema.Types.ObjectId,
        ref: "store"
      },
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
      // bankID: {
      //   type: Schema.Types.ObjectId,
      //   ref: "user"
      // },
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
      },
      deletedFlag: {
        type: Boolean
      }
  //   }
  // ]
});

module.exports = Order = mongoose.model("order", OrderSchema);
