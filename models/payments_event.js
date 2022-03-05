const db = require('../database/db');

const PaymentsEvent = {
    getAll: () => {
        const query = `SELECT * FROM payments_event`;
        return db.query(query).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getByCreatorId: (userId) => {
        const query = `SELECT payments.id AS payments_id, payments.user_id, payments.amount, payments.received_status, payments.paid_status, payments_event.id AS payments_event_id, payments_event.event_name, payments_event.event_creator_id, payments_event.total_amount, payments_event.creation_date, payments_event.due_date FROM payments_event INNER JOIN payments ON (payments_event.id = payments.payment_event_id) WHERE event_creator_id = $1`;
        // const query = `SELECT * FROM payments_event WHERE event_creator_id = $1`
        return db.query(query, [userId]).then((response) => {
            return response.rows ? response.rows : {};
        });
    },
    getByEventId: (eventId) => {
        // const query = `SELECT payments.id AS payments_id, payments.user_id, payments.amount, payments.received_status, payments.paid_status, payments_event.id AS payments_event_id, payments_event.event_name, payments_event.event_creator_id, payments_event.total_amount, payments_event.creation_date, payments_event.due_date FROM payments_event INNER JOIN payments ON (payments_event.id = payments.payment_event_id) WHERE payments_event_id = $1`;
        const query = `SELECT * FROM payments_event WHERE id = $1`;
        return db.query(query, [eventId]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getEventsByCreatorId: (userId) => {
        const query = `SELECT * FROM payments_event WHERE event_creator_id = $1`;
        return db.query(query, [userId]).then((response) => {
            return response.rows;
        });
    },
    getCompletedEventsByCreatorId: (id) => {
        const query = `SELECT * FROM payments_event WHERE completed = true AND event_creator_id = $1`;
        return db.query(query, [id]).then(response => {
            return response.rows ? response.rows[0] : {};
        });
    },  
    create: (body) => {
        const query = `INSERT INTO payments_event (event_name, total_amount, event_creator_id, description, creation_date, due_date, remaining_amount, completed) VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`;
        return db
            .query(query, [
                body.event_name,
                body.total_amount,
                body.event_creator_id,
                body.description,
                body.creation_date,
                body.due_date,
                body.total_amount,

            ])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    delete: (eventId) => {
        const query = `DELETE FROM payments_event WHERE id = $1`;
        return db.query(query, [eventId]);
    },
};

module.exports = PaymentsEvent;
