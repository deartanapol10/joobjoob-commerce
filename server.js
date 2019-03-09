const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");

// Import router file
var orders = require("./routes/api/orders");
var users = require("./routes/api/users");
var product = require("./routes/api/product");
var category = require("./routes/api/category");
var store = require("./routes/api/store");


// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(e => console.log(e));

//Init app
const app = express();

// For app.post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Express-Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Express-Validator Middleware
app.use(expressValidator());

//[Upload] show picture 
//localhost:8000/uploads/1548591284172result-clipboard.png
app.use('/uploads', express.static('uploads'));
app.use('/showImgSlip', express.static('slipImg'));

app.use("/api/user", users);
app.use("/api/orders", orders);
app.use("/api/product", product);
app.use("/api/category", category);
app.use("/api/store", store);

//Start server
app.listen(8000, () => {
  console.log("Server started on port 8000.");
});