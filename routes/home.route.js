const express = require("express");
const videoUrlController = require("../controllers/videoUrl.controller");
const reviewSystemController = require("../controllers/reviewSystem.controller");
const sliderController = require("../controllers/slider.controller");
const eventController = require("../controllers/event.controller");
const instructorController = require("../controllers/instructor.controller");
const freeConsultancyController = require("../controllers/freeConsultancy.controller");
const mockTestController = require("../controllers/mockTest.controller");
const courseRegistration = require("../controllers/courseRegistration.controller");

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
router.get(
  "/instructor/get/:batchNo/:email",
  instructorController.getSpecificBatchAndEmail
);
router.put("/instructor/updateUrl/:id", instructorController.updateUrl);
router.put(
  "/instructor/updateFile/:id",
  upload.single("filename"),
  instructorController.updateFile
);
router.delete("/instructor/delete/:id", instructorController.deleteInstructor);
router.delete(
  "/instructor/updateUrl/delete/:instructorId/:urlUploadId",
  instructorController.deleteInstructorUrl
);
router.delete(
  "/instructor/updatefile/delete/:instructorId/:fileUploadId",
  instructorController.deleteInstructorFile
);

//free consultancy crud
router.post(
  "/freeConsultancy/post",
  freeConsultancyController.postFreeConsultancy
);
router.get(
  "/freeConsultancy/get/all",
  freeConsultancyController.getAllFreeConsultancy
);
router.get(
  "/freeConsultancy/get/:email",
  freeConsultancyController.getFreeConsultancyByEmail
);
// router.put("/videos/update/:id", videoUrlController.updateVideosUrl);
router.delete(
  "/freeConsultancy/delete/:id",
  freeConsultancyController.deleteFreeConsultancy
);

// Mock test crud
router.post("/mockTest/post", mockTestController.postMockTest);
router.get("/mockTest/get/all", mockTestController.getAllMockTest);
router.get("/mockTest/get/:email", mockTestController.getMockTestByEmail);
router.get("/mockTest/getById/:id", mockTestController.getMockTestById);
// // router.put("/videos/update/:id", videoUrlController.updateVideosUrl);
router.delete("/mockTest/delete/:id", mockTestController.deleteMockTest);

// course registration crud
router.post(
  "/courseRegistration/post",
  courseRegistration.postCourseRegistration
);
router.get(
  "/courseRegistration/get/all",
  courseRegistration.getAllCourseRegistration
);
router.get(
  "/courseRegistration/get/:email",
  courseRegistration.getCourseRegistrationByEmail
);
router.get(
  "/courseRegistration/getById/:id",
  courseRegistration.getCourseRegistrationById
);
router.put(
  "/courseRegistration/add-instructor/:courseRegistrationId",
  courseRegistration.addInstructorInCourseRegistration
);
router.delete(
  "/courseRegistration/delete/:id",
  courseRegistration.deleteCourseRegistration
);

//bksh payment course
router.post(
  "/courseRegistration/bkashGrandToken/post",
  courseRegistration.bkashGrandtoken
);
router.post(
  "/courseRegistration/bkash-checkout/post",
  courseRegistration.postBkshPayment
);
router.get(
  "/courseRegistration/bkash-callback",
  courseRegistration.bkshCallback
);

//bksh payment test

router.post(
  "/mockTest/bkash-checkout/post",
  mockTestController.postBkshPayment
);
router.get("/mockTest/bkash-callback", mockTestController.bkshCallback);

module.exports = router;
