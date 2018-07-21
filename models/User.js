const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 3f6d909d73191a563848509e917247ba36dbbf10
});

module.exports = User = mongoose.model("user", UserSchema);
