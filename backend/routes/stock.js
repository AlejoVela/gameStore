const stockController = require("../controllers/stock");
const router = require("express").Router();

router.post("/registerStock", stockController.registerStock );
router.get("/listStock", stockController.listStock );

module.exports = router;