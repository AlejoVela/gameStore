const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
    productCode: String,
    amount: Number,
    stockRoom: String,
    productId: { type: mongoose.Schema.ObjectId, ref: "product" },
    date: { type: Date, default: Date.now() },
});

const stock = mongoose.model( "stock", stockSchema );
module.exports = stock;