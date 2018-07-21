const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");

// Import router file
var orders = require("./routes/api/orders");
var users = require("./routes/api/users");
var product = require("./routes/api/product");

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

//Express-Validator Middleware
app.use(expressValidator());

app.use("/api/orders", orders);
app.use("/api/users", users);
app.use("/api/product", product);

//Start server
app.listen(8000, () => {
  console.log("Server started on port 8000.");
});
