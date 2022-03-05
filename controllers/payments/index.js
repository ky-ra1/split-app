const express = require('express');
const payments = require('../../models/payments');
const PaymentsEvent = require('../../models/payments_event');

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

router.patch('/updatePaidStatus/', (req, res) => {
    payments.updatePaidStatus(req.body).then((payment) => {
        res.json(payment);
    });
});

router.patch('/updateReceivedStatus/', (req, res) => {
    payments.updateReceivedStatus(req.body).then((payment) => {
        const updateBody = {
            amount: payment.rows[0].amount,
            payment_event_id: payment.rows[0].payment_event_id,
            status: true
        };
    
        //modify status from update body to be false if the user is moving a paid item back to unpaid
        if(!req.body.received_status) {
            updateBody.status = false;
        }

        PaymentsEvent.updateRemainingAmount(updateBody).then(event => {
            payments.getPaymentByEventId(event.event_creator_id).then(response => {
                let completedPayments = 0;
                response.rows.forEach(payments => {
                    if(payments.received_status && payments.paid_status) {
                        completedPayments += 1;
                    }
                });
                if(completedPayments === response.rows.length) {
                    PaymentsEvent.updateCompletedStatus(response.rows[0].payment_event_id).then(response => {
                        return response;
                    });
                }
            });
        });

        res.json(payment);
    });
});

router.delete("/:id", (req, res) => {
    payments.delete(req.params.id).then(() => res.json({ status: "ok" }));
});

module.exports = router;
