const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");

router.post("/auth", UserController.userRegister);
router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/list", UserController.getAllUsers);

module.exports = router;
