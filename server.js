//*BRING IN EXPRESS
const express = require('express');

//* File for path during build 
const path = require ('path')

//*BRING IN DB
const connectDB = require('./config/db');

const app = express();

//*INITIALIZE AND CONNECT TO DB
connectDB();

//*MIDDLEWARE
//  ! replaced body parser
app.use(express.json({ extended: false }));

// app.use(responseTime);
//const responseTime = require('./middleware/responseTime');

//*DEFINED ROUTES, CALLS ROUTE FOLDER
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('client/build'));

  app.get('*', (re,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
