const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middileware/verifyToken");
const router = express.Router();
const multer = require("multer");
// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/jwt", userController.jwtCreate);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/google_login/:email", userController.googleLogin);
router.post("/phone_login/:phone", userController.phoneLogin);
// router.get("/data", userController.getData);
// router.get("/me", verifyToken, userController.getMe);
router.get("/me/:email", userController.getMe);
router.get("/me/:email/:phone",  userController.getMeByMailandPhone);
router.put("/update/:email",  userController.updateUser);
router.put("/updateProfilePicture/:email", upload.single("filename"),  userController.updateProfilePicture);
router.put("/updatePhone/:email",  userController.updatePhoneNumber);
router.put("/updateAddress/:email",  userController.updateUserAddress);


module.exports = router;