const express = require("express");
// <<<<<<< HEAD
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
   .connect(db)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log(err));
// =======
// const path = require("path");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const expressValidator = require("express-validator");
// const flash = require("connect-flash");
// const session = require("express-session");

// // Import router file
// var orders = require("./routes/api/orders");
// var users = require("./routes/api/users");
// var product = require("./routes/api/product");

// // DB config
// const db = require("./config/keys").mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(e => console.log(e));
// >>>>>>> 3f6d909d73191a563848509e917247ba36dbbf10

//Init app
const app = express();

// For app.post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Passport config
require("./config/passport")(passport);
//Passport Middleware
app.use(passport.initialize());

// const order = require("./routes/api/order");
const user = require("./routes/api/user");
//Use routes
// app.use("/api/order", order);
app.use("/api/user", user);

// process.env.PORT : for deploying on Heroku
const port = process.env.PORT || 6666;

//Start server
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
// //Set public folder
// app.use(express.static(path.join(__dirname, "public")));

// //Express-Session Middleware
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true
//   })
// );

// //Express-Validator Middleware
// app.use(expressValidator());

// app.use("/api/orders", orders);
// app.use("/api/users", users);
// app.use("/api/product", product);

// //Start server
// app.listen(8000, () => {
//   console.log("Server started on port 8000.");
// >>>>>>> 3f6d909d73191a563848509e917247ba36dbbf10
});
