const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const saleSchema = mongoose.Schema({
    productId: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    userId: { type: mongoose.Schema.ObjectId, ref: "user"},
    userEmail: String,
    productInfo: [{code:String, amount:Number}],
    price: Number,
    code: {type: String, default: uuidv4()},
    date: { type: Date, default: Date.now() },
});

const sale = mongoose.model("sale", saleSchema );
module.exports = sale;