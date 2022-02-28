const express = require('express');

const paymentEventsController = require('./controllers/payments_event');

// const db = require('./database/db');

const port = process.env.PORT || 3000;
const app = express();

// app.get('/', (req, res) => {
//     res.send('hello');
// });

app.use(express.static("client"));

app.use("/api/paymentsEvent/", paymentEventsController);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
