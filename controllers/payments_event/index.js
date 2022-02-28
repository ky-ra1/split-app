const express = require('express');
const paymentEvents = require('../../models/payment_events');

const router = express.Router();

router.get('/', (req, res) => {
    paymentEvents.getAll().then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByCreatorId/:id', (req, res) => {
    paymentEvents.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByEventId/:id', (req, res) => {
    paymentEvents.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

//TO DO PATCH


module.exports = router;