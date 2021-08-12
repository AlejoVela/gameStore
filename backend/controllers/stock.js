const Stock = require("../models/stock");
const Product = require("../models/product");

const registerStock = async (req, res) => {
    if(!req.body.productCode || !req.body.amount || !req.body.stockRoom)
        return res.status(401).send("Failed: There are empty fields");
    
    let existingStockRoom = await Stock.findOne({
        stockRoom: req.body.stockRoom,
        productCode: req.body.productCode
    });
    if(existingStockRoom) return res.status(401).send("Failed: this stockroom already exist");

    let product = await Product.findOne({code: req.body.productCode});
    if(!product) return res.status(401).send("Failed: related product doesn't exist");

    //creamos el stock
    let stock = new Stock({
        productCode: req.body.productCode,
        amount: req.body.amount,
        stockRoom: req.body.stockRoom,
        productId: product._id,
    });

    let result = await stock.save();
    if(!result) return res.status(400).send("Failed: Failed to register stock in DB");
    
    //modificamos el stock del producto
    await Product.updateOne({
        code: req.body.productCode
    },{ 
        $set: {
            stock: (product.stock+req.body.amount)
        } 
    });


    //devolvemos la respuesta 
    return res.status(201).send({stock});
};

const listStock = async (req, res) => {
    let stock = await Stock.find().populate("productId").exec();
    if(!stock || stock.length === 0) return res.status(400).send("Failed: There aren't stock");
    return res.status(200).send({stock});
};

module.exports = { registerStock, listStock };