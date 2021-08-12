const saleController = require("../controllers/sale");
const router = require("express").Router();

router.post("/registerSale", saleController.registerSale);
router.get("/listSale", saleController.listSale);

module.exports = router;