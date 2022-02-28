const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const db = require('../database/db');

const Payments = {
    getAll: () => {
        const query = 'SELECT * FROM payments';
        return db.query(query).then((response) => {
            return response.rows;
        })
    },
    getById: (id) => {
        const query = 'SELECT * FROM payments WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getPaymentsOwed: (id) => {
        const query =
            'SELECT payments.id AS payments_id, payments.user_id, payments_event.id AS event_id, payments_event.event_name, payments.paid_status, payments.recieved_status, payments.paid_date FROM payments INNER JOIN payments_event ON (payments_event.id = payments.payment_event_id) WHERE user_id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getPaymentsPaid: (id) => {
        const query =
            'SELECT payments.id AS payments_id, payments.user_id, payments_event.id AS event_id, payments_event.event_name, payments.paid_status, payments.recieved_status, payments.paid_date FROM payments INNER JOIN payments_event ON (payments_event.id = payments.payment_event_id) WHERE user_id = $1 and payments.recieved_status = true;';
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    updatePaidStatus: (paid_status, id) => {
        const query = 'UPDATE payments SET paid_status = $1 WHERE id = $2 RETURNING *';
        return db.query(query, [paid_status, id]).then((response) => {
            return response;
        });
    },
    updateReceivedStatus: (received_status, id) => {
        const query =
            'UPDATE payments SET recieved_status = $1, paid_date = current_date WHERE id = $2 RETURNING *';
        return db.query(query, [received_status, id]).then((response) => {
            return response;
        });
    },
    delete: (id) => {
        const query = `DELETE FROM payments WHERE id = $1`;
        return db.query(query, [id]);
    },
};

module.exports = Payments;