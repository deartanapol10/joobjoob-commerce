const mongoose = require('mongoose');

//Article Schema
var orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    }
});

var Order = module.exports = mongoose.model('Order', orderSchema);
