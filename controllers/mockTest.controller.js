const { default: axios } = require("axios");
const bkashGrandToken = require("../modules/bkashGrandToken");
const mockTestRegistration = require("../modules/mockTestRegistration");
const { addMockTest, getAllMockTest, deleteMockTestbyId, findMockTestByEmail } = require("../services/mockTest.service");


exports.postBkshPayment = async (req, res) => {
  try {
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
    const { totalFee, callbackURL, _id, reference } = req.body;

    id_token = data.id_token;
    //update refesh token
    if (token_id[0].refresh_token != data.refresh_token) {
      updateRefeshToken = await bkashGrandToken.findOneAndUpdate(
        { _id: "66ff7f1d623f46dc92da742a" },
        { refresh_token: data.refresh_token }
      );
    }
    if (token_id[0].id_token == data.id_token) {
      console.log("equal");
      const paymentDetails = {
        mode: "0011",
        payerReference: "0",
        callbackURL:
          "http://localhost:8080/api/v1/home/mockTest/bkash-callback",
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
          "http://localhost:8080/api/v1/home/mockTest/bkash-callback",
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
    }
    //   const { totalFee, callbackURL, _id, reference } = req.body;

    //   const paymentDetails = {
    //     amount: totalFee || 10, // your product price
    //     callbackURL:
    //       callbackURL ||
    //       "http://localhost:8080/api/v1/home/courseRegistration/bkash-callback", // your callback route
    //     orderID: _id || "Order_101", // your orderID
    //     reference: reference || "1", // your reference
    //   };
    //   const result = await createPayment(bkashConfig, paymentDetails);
    //   res.send(result.bkashURL);
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
      return res.redirect(`http://localhost:3000/error?message=${status}`);
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
      const updateResult = await mockTestRegistration.updateOne(
        { _id: result?.data?.merchantInvoiceNumber },
        { paid: true, transactionId: result?.data?.trxID }
      );

      return res.redirect(
        `http://localhost:3000/success?id=${result?.data?.merchantInvoiceNumber}`
      );
    } else {
      return res.redirect(
        `http://localhost:3000/error?message=${result?.data?.statusMessage}`
      );
    }
  } catch (e) {
    console.log(e);
    return res.redirect(
      `http://localhost:3000/error?message=${result?.data?.statusMessage}`
    );
  }
};



exports.postMockTest = async (req, res) => {
  try {
    const data = await addMockTest(req.body);

    res
    .status(200)
    .send({ message: "course registration added successfully", data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllMockTest = async (req, res) => {
  try {
    const data = await getAllMockTest();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getMockTestByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await findMockTestByEmail(email);

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};




exports.deleteMockTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteMockTestbyId(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
