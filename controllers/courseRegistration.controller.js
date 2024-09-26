const courseRegistration = require("../modules/courseRegistration");
const instructorInfo = require("../modules/instructor");
const {
  addCourseRegistration,
  getAllCourseRegistrations,
  deleteCourseRegistrationbyId,
  findCourseRegistrationsByEmail,
} = require("../services/courseRegistration.service");
const {
  createPayment,
  executePayment,
  queryPayment,
  searchTransaction,
  refundTransaction,
} = require("bkash-payment");

// bKash Credentials setup
const bkashConfig = {
  base_url: process.env.BKASH_CHECKOUT_URL_BASE_URL,
  username: process.env.BKASH_CHECKOUT_URL_USER_NAME,
  password: process.env.BKASH_CHECKOUT_URL_PASSWORD,
  app_key: process.env.BKASH_CHECKOUT_URL_APP_KEY,
  app_secret: process.env.BKASH_CHECKOUT_URL_APP_SECRET,
};

exports.postBkshPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { totalFee, callbackURL, _id, reference } = req.body;
  
    const paymentDetails = {
      amount: totalFee || 10, // your product price
      callbackURL: callbackURL || "http://localhost:8080/api/v1/home/courseRegistration/bkash-callback", // your callback route
      orderID: _id || "Order_101", // your orderID
      reference: reference || "1", // your reference
    };
    const result = await createPayment(bkashConfig, paymentDetails);
    res.send(result.bkashURL);
  } catch (e) {
    console.log(e);
  }
};

exports.bkshCallback = async (req, res) => {
  try {
    const { status, paymentID } = req.query
    let result
    let response = {
      statusCode : '4000',
      statusMessage : 'Payment Failed'
    }
    if(status === 'success')  result =  await executePayment(bkashConfig, paymentID)

    if(result?.transactionStatus === 'Completed'){
      // payment success
      // insert result in your db
      const updateResult = await courseRegistration.updateOne(
        { _id: result.merchantInvoiceNumber },
        { paid: true }
      );
    }
    if(result) response = {
      statusCode : result?.statusCode,
      statusMessage : result?.statusMessage
    }
    // You may use here WebSocket, server-sent events, or other methods to notify your client
    res.send(response)
  } catch (e) {
    console.log(e)
  }
};

exports.postCourseRegistration = async (req, res) => {
  try {
    const data = await addCourseRegistration(req.body);

    res.status(200).send({ message: "course registration added successfully" ,data});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllCourseRegistration = async (req, res) => {
  try {
    const data = await getAllCourseRegistrations();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


exports.getCourseRegistrationByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await findCourseRegistrationsByEmail(email);

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



exports.addInstructorInCourseRegistration = async (req, res) => {
  try {
    const { instructorId } = req.body; // Assuming instructorId is sent in the request body
    const { courseRegistrationId } = req.params;

    // Validate that both instructor and course registration exist
    const instructor = await instructorInfo.findById(instructorId);

    if (!instructor) {
      return res.status(404).send("Instructor not found");
    }

    const getSpecificCourseRegistration = await courseRegistration.findById(
      courseRegistrationId
    );

    if (!getSpecificCourseRegistration) {
      return res.status(404).send("Course registration not found");
    }

    // Update course registration with the instructor
    getSpecificCourseRegistration.instructorId = instructor._id;

    await getSpecificCourseRegistration.save();

    res.status(200).send(getSpecificCourseRegistration);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCourseRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteCourseRegistrationbyId(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
