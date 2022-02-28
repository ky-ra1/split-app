const express = require('express');

const paymentEventsController = require('./controllers/payments_event');
const usersController = require('./controllers/users');
const paymentsController = require('./controllers/payments');

// const db = require('./database/db');

const port = process.env.PORT || 3000;
const app = express();

// app.get('/', (req, res) => {
//     res.send('hello');
// });

app.use(express.static('client'));

app.use('/api/paymentsEvent/', paymentEventsController);
app.use('/api/users/', usersController);
app.use('/api/payments/', paymentsController);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
