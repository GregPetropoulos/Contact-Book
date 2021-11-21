//*MIDDLEWARE FOR THE TOKEN VERIFICATION AND PASSING PAYLOAD THROUGH

const jwt = require('jsonwebtoken');

//* PROTECT GLOBAL VARIABLES
require('dotenv').config();

//* GRABBING VARIABLE FROM .ENV
const jwtSecret = process.env.MY_JWT_SECRET;

module.exports = function (req, res, next) {
  //* GET TOKENS FROM HEADER
  const token = req.header('x-auth-token');

  // CHECK IF NOT TOKEN
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //* ELSE VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, jwtSecret);

    //* AFTER VERIFIED, ASSIGNED REQ.USER TO ENTIRE TOKEN PAYLOAD, WHICH IS IN DECODED.
    //* PAYLOAD HOLDS THE USER ID
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
