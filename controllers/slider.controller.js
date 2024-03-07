const slider = require("../modules/slider");
const { postSlider, getAllSlider, getSpecificSlider } = require("../services/slider.service");
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
exports.postSlider = async (req, res) => {
  //   const { Url, alt } = req.body;
  const dateTime = giveCurrentDateTime();
  const storage = getStorage();

  // console.log("File successfully uploaded.");
  // const image = req.file.originalname;
  // const reviewerName=req.body.reviewerName;
  // const rating=req.body.rating;
  // const comment=req.body.comment;
  // console.log(req.file)
  let images = []; 
  const heading = req.body.heading;
  const description = req.body.description;
  const slot = req.body.slot;
  // const uploadPromises = req.files.map(async (file) => {
    const storageRef = ref(
      storage,
      `files/${file.originalname + "" + dateTime}`
    );
    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
         // Additional data for each file (customize as needed)

      //   console.log(downloadURL)
      // You may want to modify the function postReviewSystem to handle an array of files
      // images.push({
      //   image: downloadURL,
      //   filename: `files/${file.originalname + "" + dateTime}`,
      // });
      console.log(images);
    // });
  try {
    

 
    // await Promise.all(uploadPromises);
    await postSlider(downloadURL,`files/${file.originalname + "" + dateTime}`,slot);
    // Wait for all file uploads to complete
   
    //   const data = await postReviewSystem(downloadURL,`files/${req.file.originalname + "" + dateTime}`,reviewerName,rating,comment);
    res.status(200).send({ message: "slider added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllSlider = async (req, res) => {
    try {
      const data = await getAllSlider();
  
      res.send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  exports.getSpecificSlider = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const data = await getSpecificSlider(id);
  
      res.send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };