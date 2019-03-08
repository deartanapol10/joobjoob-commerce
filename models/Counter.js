const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Store Schema
const CounterSchema = new Schema({
    testId: {
        type: String

    },
    seq: {
        type: Number
    }
});

module.exports = Counter = mongoose.model("counter", CounterSchema);
