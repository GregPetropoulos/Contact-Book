//*BRING IN EXPRESS
const express = require('express');



//*BRING IN DB
const connectDB = require('./config/db');

const app = express();

//*INITIALIZE AND CONNECT TO DB
connectDB();


//*MIDDLEWARE
//  ! replaced body parser
app.use(express.json({extended:false}))


// app.use(responseTime);
//const responseTime = require('./middleware/responseTime');



//*ROUTE TEST CHECK
app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact Book Manager API' })
);

//*DEFINED ROUTES, CALLS ROUTE FOLDER
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
