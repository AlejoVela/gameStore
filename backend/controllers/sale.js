const Sale = require("../models/sale");
const Product = require("../models/product");
const User = require("../models/user");
const { findOne } = require("../models/sale");

const registerSale = async (req, res) => {
    if(!req.body.userEmail || req.body.productInfo.length===0)
        return res.status(401).send("Failed: There are empty fields");
    
    let user = await User.findOne({email: req.body.userEmail});
    if(!user) return res.status(401).send("Failed: User no found");

    let product = [];
    let priceSale = 0;

    for (let i = 0; i < req.body.productInfo.length; i++) {
        let tempProduct = await Product.findOne({code: req.body.productInfo[i].code});
        if(!tempProduct) return res.status(400).send("Failed: Product no found");
        product.push(tempProduct._id);
        priceSale += tempProduct.price*req.body.productInfo[i].amount;
    }

    let sale = new Sale({
        productId: product,
        userId: user._id,
        userEmail: req.body.userEmail,
        productInfo: req.body.productInfo,
        price: priceSale,
    });

    let result = await sale.save();
    if(!result) return res.status(400).send("Failed: Error to register Sale");

    //reducimos stocks falta por implementar

    return res.status(201).send({sale});
};

const listSale = async (req, res) => {
    let sale = await Sale.find().populate("productId").exec();
    if(!sale || sale.length === 0) return res.status(400).send("Failed: There aren't sales");
    return res.status(200).send({sale});
};

module.exports = { registerSale, listSale };