const Product = require("../models/product");

const registerProduct = async (req, res) => {
    if(!req.body.name ||  !req.body.price || !req.body.code || !req.body.description)
        return res.status(401).send("Failed: There are empty fields");
    
    let existingProduct = await Product.findOne({ code: req.body.code });
    if(existingProduct) return res.status(401).send("Failed: Product already register");

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        code: req.body.code,
        description: req.body.description,
    });

    let result = await product.save();
    if(!result) return res.status(400).send("Failed: Failed to register product on DB");
    return res.status(201).send({result});
};

const listProduct = async (req, res) => {
    let product = await Product.find({name: new RegExp(req.params["name"], "i")});
    if(!product || product.length === 0) return res.status(400).send("Failed: There aren't products");
    return res.status(201).send({ product });
};

module.exports = { registerProduct, listProduct };