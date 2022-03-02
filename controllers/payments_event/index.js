const express = require('express');
const paymentsEventModel = require('../../models/payments_event');
const paymentModel = require('../../models/payments');

const router = express.Router();

router.get('/', (req, res) => {
    paymentsEventModel.getAll().then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByCreatorId/:id', (req, res) => {
    paymentsEventModel.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getByEventId/:id', (req, res) => {
    paymentsEventModel.getByCreatorId(req.params.id).then((paymentEvents) => {
        res.json(paymentEvents);
    });
});

router.get('/getEventsByCreatorId/:id', (req, res) => {
    paymentsEventModel
        .getEventsByCreatorId(req.params.id)
        .then((paymentEvents) => {
            console.log(paymentEvents);
            res.json(paymentEvents);
        });
});

router.post('/', (req, res) => {
    const { payments: paymentsData, ...data } = req.body;
    paymentsEventModel.create(data).then((paymentEvent) => {
        // let payments = [];
        for (const paymentData of paymentsData) {
            paymentModel.create({
                ...paymentData,
                payment_event_id: paymentEvent.id,
            });
        }
        res.status(201).json(paymentEvent);
    });
});
//TO DO PATCH

//TO DO DELETE

module.exports = router;
