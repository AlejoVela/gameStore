const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    code: String,
    description: String,
    stock: { type: Number, default: 0 },//este campos se actualiza al registrar stock
    date: { type: Date, default: Date.now() },
    productStus: { type: Boolean, default: true},
    //stockId: { type: mongoose.Schema.ObjectId, ref: "stock"},
});

const product = mongoose.model("product", productSchema );
module.exports = product;