const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/", UserController.getAllUsers);

module.exports = router;
