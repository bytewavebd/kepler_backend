const {
  postReviewSystem,
  getAllReviewSystem,
  getSpecificReviewSystem,
  deleteReviewSystem,
} = require("../services/reviewsSystem.service");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject, // Import deleteObject from @google-cloud/storage
} = require("firebase/storage");


const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + "" + time;
  return dateTime;
};
exports.postReviewsSystem = async (req, res) => {
  //   const { Url, alt } = req.body;
  const dateTime = giveCurrentDateTime();
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `files/${req.file.originalname + "" + dateTime}`
  );
console.log(storageRef)
  // Create file metadata including the content type
  const metadata = {
    contentType: req.file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);

  console.log("File successfully uploaded.");
  const image = req.file.originalname;
  const reviewerName=req.body.reviewerName;
  const rating=req.body.rating;
  const comment=req.body.comment;
  // console.log(req.file)
  try {
    const data = await postReviewSystem(downloadURL,`files/${req.file.originalname + "" + dateTime}`,reviewerName,rating,comment);

    res.status(200).send({ message: "review added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const data = await getAllReviewSystem();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getSpecificReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await getSpecificReviewSystem(id);

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// exports.updateVideosUrl = async (req, res) => {
//     try {
//         const { Url, alt } = req.body;
//         const updatedVideoUrl = await VideosUrl.findByIdAndUpdate(
//           req.params.id,
//           { Url, alt },
//           { new: true }
//         );
//         if (!updatedVideoUrl) {
//           return res.status(404).json({ error: "Video URL not found" });
//         }
//         res.status(200).json(updatedVideoUrl);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//   };

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
       // Get the download URL for the review to obtain the file path
       const review = await getSpecificReviewSystem(id);
       console.log(review[0].filename);
       const filePath = review[0].filename; // Adjust this based on your data structure
   
       // Create a reference to the file in Firebase Storage
       const storage = getStorage();
       const fileRef = ref(storage, filePath);
   
       // Delete the file from Firebase Storage
       await deleteObject(fileRef);
   
       // Delete the review from your database
       const deletedItem = await deleteReviewSystem(id);
   
       if (!deletedItem) {
         return res.status(404).send({ error: "Item not found" });
       }
   
       res.status(200).send({ message: "Item removed" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
