
//* BRING MONGOOSE --SIDE NOTE MONGOOSE RETURNS PROMISES
const mongoose = require('mongoose');

//* PROTECT GLOBAL VARIABLES
require('dotenv').config()

//MONGOOSE TALK TO MONGODB UTILIZING THE CONFIG FILE (GLOBAL VARIABLES)
// ***! THESE CREDS WERE UNPROTECTED***//
//*! const config = require('config');
//*! const db = config.get('mongoURI');

//**PROTECT CREDS WITH THIS .ENV INSTEAD OF BRADS' DEFAULTJSON
 const db = process.env.MY_MONGO_URI;



const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected....');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;

//*! DEPRECATED MONGOOSE NOW AUTOMATICALLY RUNS THIS:
//* useNewUrlParser: true,
//* useCreateIndex: true,
//* useFindAndModify: false
