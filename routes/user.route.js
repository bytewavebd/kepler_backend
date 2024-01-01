const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/google_login/:email", userController.googleLogin);
router.post("/phone_login/:phone", userController.phoneLogin);
// router.get("/data", userController.getData);
// router.get("/me", verifyToken, userController.getMe);
router.get("/me/:email",  userController.getMe);
router.get("/me/:email/:phone",  userController.getMeByMailandPhone);
router.put("/update/:email",  userController.updateUser);
router.put("/updatePhone/:email",  userController.updatePhoneNumber);
router.put("/updateAddress/:email",  userController.updateUserAddress);


module.exports = router;