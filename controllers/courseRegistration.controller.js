const { default: axios } = require("axios");
const courseRegistration = require("../modules/courseRegistration");
const instructorInfo = require("../modules/instructor");
const {
  addCourseRegistration,
  getAllCourseRegistrations,
  deleteCourseRegistrationbyId,
  findCourseRegistrationsByEmail,
  findCourseRegistrationsById,
} = require("../services/courseRegistration.service");

const bkashGrandToken = require("../modules/bkashGrandToken");

// bKash Credentials setup
const bkashConfig = {
  base_url: process.env.BKASH_CHECKOUT_URL_BASE_URL,
  username: process.env.BKASH_CHECKOUT_URL_USER_NAME,
  password: process.env.BKASH_CHECKOUT_URL_PASSWORD,
  app_key: process.env.BKASH_CHECKOUT_URL_APP_KEY,
  app_secret: process.env.BKASH_CHECKOUT_URL_APP_SECRET,
};
exports.bkashGrandtoken = async (req, res) => {
  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.BKASH_CHECKOUT_URL_APP_KEY,
        app_secret: process.env.BKASH_CHECKOUT_URL_APP_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.BKASH_CHECKOUT_URL_USER_NAME,
          password: process.env.BKASH_CHECKOUT_URL_PASSWORD,
        },
      }
    );
    // console.log(data)
    const bkashGrand = new bkashGrandToken(data);
    const bkashGrandTokenData = await bkashGrand.save();

    res.send(bkashGrandTokenData);
  } catch (e) {
    console.log(e);
  }
};

const refreshBkashGrandtoken =async()=>{
  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.BKASH_CHECKOUT_URL_APP_KEY,
        app_secret: process.env.BKASH_CHECKOUT_URL_APP_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.BKASH_CHECKOUT_URL_USER_NAME,
          password: process.env.BKASH_CHECKOUT_URL_PASSWORD,
        },
      }
    );
    bkashGrandToken.findOneAndUpdate(
      { _id: "66ff7f1d623f46dc92da742a" },
      { refresh_token:data.refresh_token }
    );
  } catch (e) {
    console.log(e);
  }
}

exports.postBkshPayment = async (req, res) => {
  try {

    // res
    // .status(200)
    // .send({ message: "course registration added successfully" });
    const token_id = await bkashGrandToken.find({
      _id: "66ff7f1d623f46dc92da742a",
    });

    const { data } = await axios.post(
      process.env.bkash_refresh_token_url,
      {
        app_key: process.env.BKASH_CHECKOUT_URL_APP_KEY,
        app_secret: process.env.BKASH_CHECKOUT_URL_APP_SECRET,
        refresh_token: token_id[0].refresh_token,
      },
      {
        headers: {
       
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.BKASH_CHECKOUT_URL_USER_NAME,
          password: process.env.BKASH_CHECKOUT_URL_PASSWORD,
        },
      }
    );
    // res
    // .status(200)
    // .send({ message: "course registration added successfully" ,data});
    const { totalFee, callbackURL, _id, reference } = req.body;

    id_token = data.id_token;
    //update refesh token
    // if (token_id[0].refresh_token != data.refresh_token) {
    //   refreshBkashGrandtoken();
    // }
    if (token_id[0].id_token == data.id_token) {
      console.log("equal");
      const paymentDetails = {
        mode: "0011",
        payerReference: "0",
        callbackURL:
          "https://kepler-backend.vercel.app/api/v1/home/courseRegistration/bkash-callback",
        // callbackURL:
        // "http://localhost:8080/api/v1/home/courseRegistration/bkash-callback",
        merchantAssociationInfo: "MI05MID54RF09123456One",
        amount: totalFee || "0",
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: _id || "Inv0124",
      };
      // const result = await createPayment(bkashConfig, paymentDetails);
      const result = await axios.post(
        process.env.bkash_refresh_create_url,
        paymentDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-app-key": process.env.BKASH_CHECKOUT_URL_APP_KEY,
            authorization: id_token,
          },
        }
      );

      res.send(result.data.bkashURL);
    } else {
      updateToken = await bkashGrandToken.findOneAndUpdate(
        { _id: "66ff7f1d623f46dc92da742a" },
        { id_token: id_token }
      );
      // console.log(updateToken);
      console.log("not equal");

      const paymentDetails = {
        mode: "0011",
        payerReference: "0",
        callbackURL:
          "https://kepler-backend.vercel.app/api/v1/home/courseRegistration/bkash-callback",
        // callbackURL:
        //   "http://localhost:8080/api/v1/home/courseRegistration/bkash-callback",
        merchantAssociationInfo: "MI05MID54RF09123456One",
        amount: totalFee || "0",
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: _id || "Inv0124",
      };
 
      const result = await axios.post(
        process.env.bkash_refresh_create_url,
        paymentDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-app-key": process.env.BKASH_CHECKOUT_URL_APP_KEY,
            authorization: id_token,
          },
        }
      );

      res.send(result.data.bkashURL);
    }

  } catch (e) {
    console.log(e);
  }
};

exports.bkshCallback = async (req, res) => {
  try {
    const { status, paymentID } = req.query;
    console.log(paymentID);

    // _id = "66ff7f1d623f46dc92da742a";
    const token_id = await bkashGrandToken.find({
      _id: "66ff7f1d623f46dc92da742a",
    });
    let result;
    let response = {
      statusCode: "4000",
      statusMessage: "Payment Failed",
    };

    if (status === "cancel" || status === "failure") {
      return res.redirect(`https://www.keplerbd.org/error?message=${status}`);
    }
    if (status === "success")
      // result = await executePayment(bkashConfig, paymentID);
      result = await axios.post(
        process.env.bkash_execute_payment_url,
        {
          paymentID: paymentID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-app-key": process.env.BKASH_CHECKOUT_URL_APP_KEY,
            authorization: token_id[0]?.id_token,
          },
        }
      );
    // console.log(result);
    if (
      result?.data.transactionStatus == "Completed" &&
      result?.data.statusCode == "0000"
    ) {
      // payment success
      // insert result in your db
      const updateResult = await courseRegistration.updateOne(
        { _id: result?.data?.merchantInvoiceNumber },
        { paid: true, transactionId: result?.data?.trxID }
      );

      return res.redirect(
        `https://www.keplerbd.org/success?id=${result?.data?.merchantInvoiceNumber}`
        // `http://localhost:3000/success?id=${result?.data?.merchantInvoiceNumber}`
      );

    } else {
      return res.redirect(
        `https://www.keplerbd.org/error?message=${result?.data?.statusMessage}`
      );
    }

  } catch (e) {
    console.log(e);
    return res.redirect(
      `https://www.keplerbd.org/error?message=${result?.data?.statusMessage}`
    );
  }
};

exports.postCourseRegistration = async (req, res) => {
  try {
    const data = await addCourseRegistration(req.body);

    res
      .status(200)
      .send({ message: "course registration added successfully", data });
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

exports.getCourseRegistrationById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findCourseRegistrationsById(id);

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
