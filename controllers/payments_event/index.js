const express = require('express');
const paymentsEvent = require('../../models/payments_event');

const router = express.Router();

router.get('/', (req, res) => {
    paymentsEvent.getAll().then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByCreatorId/:id', (req, res) => {
    paymentsEvent.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByEventId/:id', (req, res) => {
    paymentsEvent.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

//TO DO PATCH

//TO DO DELETE


module.exports = router;