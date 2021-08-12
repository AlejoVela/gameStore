const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
    productCode: Number,
    amount: Number,
    stockRoom: String,
    date: { type: Date, default: Date.now() },
    productId: { type: mongoose.Schema.ObjectId, ref: "product" },
});

const stock = mongoose.model( "stock", stockSchema );
module.exports = stock;