const express = require('express');
const app = express();
// const responseTime = require('./middleware/responseTime');


// MIDDLEWARE
// app.use(responseTime);



// ROUTE CHECK
app.get('/', (req, res) => res.json({msg: "Welcome to the Contact Book Manager API"}));

// DEFINED ROUTES, CALLS ROUTE FOLDER
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));