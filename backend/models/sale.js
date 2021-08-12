const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    productId: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    userId: { type: mongoose.Schema.ObjectId, ref: "user"},
    price: Number,
    code: String,
    date: { type: Date, default: Date.now() },
});

const sale = mongoose.model("sale", saleSchema );
module.exports = sale;