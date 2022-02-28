const express = require('express');
const payments = require('../../models/payments');

const router = express.Router();

router.get('/', (req, res) => {
    payments.getAll().then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

module.exports = router;
