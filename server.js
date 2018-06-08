const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// If run offline, use localhost:27017
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecomm');
var db = mongoose.connection;

//Check DB connection
db.once('open', () => {
    console.log('Connected to MongoDB!');
});
//Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

//Import models
var Order = require('./models/order.model.js');

//Init app
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// For app.post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express-Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

//Express-Message Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express-Validator Middleware
app.use(expressValidator());

//Home route
app.get('/', (req, res) => {
    Order.find({}, (err, order) => {
        if(err) {
            return console.log(err);
        }

        res.render('index', {
            title: 'Your Database',
            order: order
        });
    });
});

//Articles routes
//Everything that uses './routes/articles.js', send it to articles in routes folder
var order_route = require('./routes/order.route.js');
app.use('/orders', order_route);


//Start server
app.listen(8000, () => {
    console.log('Server started on port 8000.');
});
