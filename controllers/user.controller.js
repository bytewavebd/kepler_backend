const {
  signupService,
  findUserByEmail,
  googleLoginService,
  findUserByPhone,
  findUserByEmailandPhone,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");

const jwt = require("jsonwebtoken");

exports.jwtCreate=async(req, res)=>{
  const user = req.body;
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  res.send({ token });
}

exports.signup = async (req, res) => {
  try {
    // const userPhone = await findUserByPhone(req.body.phone);

    const email = await findUserByEmail(req.body.email);
    console.log(req);
    if (!email) {
      const user = await signupService(req.body);
      console.log("user", user);

      return res.status(200).json({
        status: "success",
        message: "Successfully signed up",
        user,
      });
    } else {
      return res.status(403).json({
        status: "emailfail",
        error: "email  Exits ",
      });
    }
    // if (!email && !userPhone) {
    //   const user = await signupService(req.body);
    //   console.log("user", user);

    //   return res.status(200).json({
    //     status: "success",
    //     message: "Successfully signed up",
    //     user,
    //   });
    // } else if (email) {
    //   if (userPhone) {
    //     const user = await findUserByEmailandPhone(email, userPhone);
    //     if (user) {
    //       return res.status(401).json({
    //         status: "phoneFail",
    //         error:
    //           "phone number already exits with another mail, please use another phone number",
    //       });
    //     } else {
    //       return res.status(403).json({
    //         status: "emailPhonefail",
    //         error: "email and phone Already Exits ",
    //       });
    //     }
    //   } else {
    //     return res.status(401).json({
    //       status: "emailFail",
    //       error: "email Already Exits ",
    //     });
    //   }
    // } else if (userPhone) {
    //   return res.status(402).json({
    //     status: "phoneFail",
    //     error: "phone number Already Exits ",
    //   });
    // }
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }
    // const isPasswordValid = user.comparePassword(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(403).json({
    //     status: "fail",
    //     error: "Password is not correct",
    //   });
    // }

    const token = generateToken(user);
    console.log(token)
    const { ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.phoneLogin = async (req, res) => {
  try {
    const phone = req.params.phone;
    // console.log(req.params.phone);
    // console.log(phone);

    if (!phone) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByPhone(phone);
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const token = generateToken(user);

    const { ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    // console.log(user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.getMeByMailandPhone = async (req, res) => {
  try {
    const email = req.params.email;
    const phone = req.params.phone;
    // console.log(phone, email)
    const user = await findUserByEmailandPhone(email, phone);
    // console.log(user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);

    user.userName = req.body.userName;
    user.phone = req.body.phone;
    user.gender = req.body.gender;

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    await user.save();
    res.status(200).json({
      status: "User profile updated successfully",
      data: user,
    });
    // res.json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updatePhoneNumber = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);

    // user.userName = req.body.userName;
    user.phone = req.body.phone;
    // user.gender = req.body.gender;

    const userbyphone = await findUserByPhone(req.body.phone);

    if (userbyphone) {
      return res.status(401).json({
        status: "fail",
        error: "phone number already exist",
      });
    }

    // console.log(user);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    await user.save();
    res.status(200).json({
      status: "User profile updated successfully",
      data: user,
    });
    // res.json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateUserAddress = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);

    user.address.address1 = req.body.address1;
    user.address.address2 = req.body.address2;
    user.address.thana = req.body.thana;
    user.address.district = req.body.district;
    user.address.country = req.body.country;
    user.address.postalCode = req.body.postalCode;

    await user.save();
    res.status(200).json({
      status: "User profile updated successfully",
      data: user,
    });

    // res.json({ message: "User address updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.googleLogin = async (req, res) => {
  const email = req.params.email;

  const user = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };

  const result = await googleLoginService(filter, updateDoc, options);
  const userData = await findUserByEmail(email);
  // const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
  //   expiresIn: "1h",
  // });
  const token = generateToken(user);
  res.send({ result, token, userData });
  // res.status(200).json({
  //   status: "success",
  //   message: "Successfully logged in",
  //   data: {
  //     user: result,
  //     token,
  //     userData
  //   },
  // });
};
