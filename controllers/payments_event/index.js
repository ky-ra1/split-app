const express = require('express');
const paymentsEventModel = require('../../models/payments_event');
const paymentModel = require('../../models/payments');
const usersModel = require('../../models/users');

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
            res.json(paymentEvents);
        });
});

router.get('/getCompletedEvents/:id', (req, res) => {
    paymentsEventModel
        .getCompletedEventsByCreatorId(req.params.id)
        .then((paymentEvents) => {
            res.json(paymentEvents);
        });
});

router.post('/', (req, res) => {
    const { payments: paymentsData, ...data } = req.body;
    usersModel
        .getAll()
        .then((response) => {
            const enteredUsers = paymentsData;
            let dbUsers = [];
            for (const idx in response) {
                dbUsers.push(response[idx].username);
            }

            for (const idx in enteredUsers) {
                if (!dbUsers.includes(enteredUsers[idx].user)) {
                    throw new Error(`${enteredUsers[idx].user} does not exist`);
                }
            }

            dbUsers = [];
            for (const idx in response) {
                for (const idx in enteredUsers) {
                    if (response[idx].user === enteredUsers[idx].username) {
                        enteredUsers[idx]['user_id'] = response[idx].id;
                    }
                }
            }

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
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Username not found',
            });
        });
});

//TO DO PATCH

//TO DO DELETE

module.exports = router;
