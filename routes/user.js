const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/login", userController.handleRenderLogin);
router.post("/login", userController.handleLogin);

router.post("/register", userController.handleRegister);
router.get("/register", userController.handleRenderRegister);

router.get("/logout", userController.handleLogout);

// router.delete("/favorite/delete", userController.removeFavorite);
// router.post("/favorite/add", userController.addFavorite);
// router.get("/favorite", userController.handleRenderFavorite);

module.exports = router;