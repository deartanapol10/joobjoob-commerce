const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
   userid: {
      type: Schema.Types.ObjectId,
      ref: "user"
   },
   orders: [
      {
         productid: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
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
      required: true
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
      required: true
   },
   paymentTime: {
      type: Date
   },
   trackingNumber: {
      type: Date
   },
   createdAt: {
      type: Date
   },
   updatedAt: {
      type: Date
   }
});

module.exports = Order = mongoose.model("order", OrderSchema);
