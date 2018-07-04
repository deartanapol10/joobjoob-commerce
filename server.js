const express = require("express");
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
});
