const userController = require("../controllers/user");
const router = require("express").Router();

router.get("/listUser/:name?", userController.listUser);
router.post("/registerUser", userController.registerUser);

module.exports = router;