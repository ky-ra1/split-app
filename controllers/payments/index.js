const express = require('express');
const payments = require('../../models/payments');

const router = express.Router();

router.get('/', (req, res) => {
    payments.getAll().then((payment) => {
        res.json(payment);
    });
});

router.get('/getById/:id', (req, res) => {
    payments.getById(req.params.id).then((payment) => {
        res.json(payment);
    })
});

router.get('/getPaymentsOwedToMe/:id', (req, res) => {
    payments.getPaymentsOwedToMe(req.params.id).then((payment) => {
        res.json(payment);
    });
});

router.get('/getPaymentsOwingToMe/:id', (req, res) => {
    payments.getPaymentsOwingToMe(req.params.id).then((payment) => {
        res.json(payment);
    });
});


router.get('/getPaymentsPaid/:id', (req, res) => {
    payments.getPaymentsPaid(req.params.id).then((payment) => {
        res.json(payment)
    });
});

router.put('/updatePaidStatus/', (req, res) => {
    payments.updatePaidStatus(req.body).then((payment) => {
        res.json(payment);
    })
});

router.put('/updateReceivedStatus/', (req, res) => {
    payments.updateReceivedStatus(req.body).then((payment) => {
        res.json(payment);
    });
});

router.delete("/:id", (req, res) => {
    payments.delete(req.params.id).then(() => res.json({ status: "ok" }));
});

module.exports = router;
