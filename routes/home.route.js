const express = require("express");
const videoUrlController = require("../controllers/videoUrl.controller");
const reviewSystemController = require("../controllers/reviewSystem.controller");
const sliderController = require("../controllers/slider.controller");
const eventController = require("../controllers/event.controller");
const instructorController = require("../controllers/instructor.controller");

const router = express.Router();
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const multer = require("multer");
const config = require("../config/firebase.config");
const verifyToken = require("../middileware/verifyToken");
// const upload =require("../middileware/uploader");
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
// const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

//review crud
router.post(
  "/review/post",
  upload.single("filename"),
  reviewSystemController.postReviewsSystem
);
router.get("/review/get/all", reviewSystemController.getAllReviews);
router.get("/review/get/:id", reviewSystemController.getSpecificReview);
// router.put("/videos/update/:id", videoUrlController.updateVideosUrl);
router.delete("/review/delete/:id", reviewSystemController.deleteReview);

//videosUrl crud
router.post("/videos/post", videoUrlController.postVideosUrl);
router.get("/videos/get/all", videoUrlController.getAllVideosUrl);
router.get("/videos/get/:id", videoUrlController.getSpecificVideosUrl);
router.put("/videos/update/:id", videoUrlController.updateVideosUrl);
router.delete("/videos/delete/:id", videoUrlController.deleteVideosUrl);

//slider crud
router.post(
  "/slider/post",
  upload.single("filename"),
  sliderController.postSlider
);
router.get("/slider/get/all", sliderController.getAllSlider);
router.get("/slider/get/:id", sliderController.getSpecificSlider);
router.delete("/slider/delete/:id", sliderController.deletePhoto);

//event crud
router.post(
  "/event/post",
  upload.single("filename"),
  eventController.postEvent
);
router.get("/event/get/all", eventController.getAllEvent);
// router.get("/slider/get/:id", sliderController.getSpecificSlider);
router.delete("/event/delete/:id", eventController.deleteEvent);

//instructor crud
router.post("/instructor/post", instructorController.postInstructor);
router.get("/instructor/get/all", instructorController.getAllInstructor);
// router.get("/videos/get/:id", videoUrlController.getSpecificVideosUrl);
router.put("/instructor/updateUrl/:id", instructorController.updateUrl);
router.put("/instructor/updateFile/:id",upload.single("filename"), instructorController.updateFile);
router.delete("/instructor/delete/:id", instructorController.deleteInstructor);
router.delete("/instructor/updateUrl/delete/:instructorId/:urlUploadId", instructorController.deleteInstructorUrl);

module.exports = router;
