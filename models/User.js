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
   store: [
      {
         id: {
            type: Schema.Types.ObjectId
            // required: true
         },
         name: {
            type: String
            // required: true
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
