const jwt = require("jsonwebtoken");
const { promisify } = require("util");
/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers?.authorization?.split(" ")?.[1];

//     if(!token){
//       return res.status(401).json({
//         status: "fail",
//         error: "You are not logged in"
//       });
//     }
    

//     const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

//     // const user = User.findOne({ email: decoded.email })

//     req.user = decoded;

//     next();


//   } catch (error) {
//     res.status(403).json({
//       status: "fail",
//       error: "Invalid token"
//     });
//   }
// };
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      req.decoded = decoded;
      next();
    })
  

  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token"
    });
  }
};


  // console.log('inside verify token', req.headers.authorization);
