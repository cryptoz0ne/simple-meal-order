const mongoose = require("mongoose");

const schema = mongoose.Schema({
    description: String,
    status: String,
    error: String
});

module.exports = mongoose.model("Order", schema);