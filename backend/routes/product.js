const productController = require ("../controllers/product");
const router = require("express").Router();

router.post("/registerProduct", productController.registerProduct );
router.get("/listProduct/:name?", productController.listProduct );

module.exports = router;