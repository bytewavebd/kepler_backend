const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject, // Import deleteObject from @google-cloud/storage
} = require("firebase/storage");
const { postEvent, getAllEvent, deleteEvent, getSpecificEvent } = require("../services/event.service");

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + "" + time;
  return dateTime;
};
exports.postEvent = async (req, res) => {
  //   const { Url, alt } = req.body;
  const dateTime = giveCurrentDateTime();
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `files/${req.file.originalname + "" + dateTime}`
  );
  console.log(storageRef);
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
  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;
  // console.log(req.file)
  try {
    const data = await postEvent(
      downloadURL,
      `files/${req.file.originalname + "" + dateTime}`,
      title,
      date,
      description
    );

    res.status(200).send({ message: "event added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


exports.getAllEvent = async (req, res) => {
    try {
      const data = await getAllEvent();
  
      res.send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };


  exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
         // Get the download URL for the review to obtain the file path
         const review = await getSpecificEvent(id);
    
         const filePath = review[0].filename; // Adjust this based on your data structure
     
         // Create a reference to the file in Firebase Storage
         const storage = getStorage();
         const fileRef = ref(storage, filePath);
     
         // Delete the file from Firebase Storage
         await deleteObject(fileRef);
     
         // Delete the review from your database
     
         const deletedItem = await deleteEvent(id);
     
         if (!deletedItem) {
           return res.status(404).send({ error: "Item not found" });
         }
     
         res.status(200).send({ message: "Item removed" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  