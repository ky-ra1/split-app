const express = require('express');
const paymentsEvent = require('../../models/payments_event');

const router = express.Router();

router.get('/', (req, res) => {
    paymentsEvent.getAll().then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

module.exports = router;
