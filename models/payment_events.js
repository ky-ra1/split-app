const db = require('../database/db');

const PaymentEvents = {
    getAll: () => {
        const query = `SELECT * FROM payment_events`;
        return db.query(query).then((response) => {
            return response.rows ? response.rows[0] : {};
        });        
    },
    getByCreatorId: (userId) => {
        const query = `SELECT payments.id AS payments_id, payments.user_id, payments.amount, payments.recieved_status, payments.paid_status, payment_events.id AS payments_event_id, payment_events.event_name, payment_events.event_creator_id, payment_events.total_amount, payment_events.creation_date, payment_events.due_date FROM payment_events INNER JOIN payments ON (payment_events.id = payments.payment_event_id) WHERE event_creator_id = $1`;
        // const query = `SELECT * FROM payment_events WHERE event_creator_id = $1`
        return db.query(query, [userId]).then((response) => {
            return response.rows ? response.rows : {};
        });
    },
    getByEventId: (eventId) => {
        // const query = `SELECT payments.id AS payments_id, payments.user_id, payments.amount, payments.recieved_status, payments.paid_status, payment_events.id AS payments_event_id, payment_events.event_name, payment_events.event_creator_id, payment_events.total_amount, payment_events.creation_date, payment_events.due_date FROM payment_events INNER JOIN payments ON (payment_events.id = payments.payment_event_id) WHERE payments_event_id = $1`;
        const query = `SELECT * FROM payment_events WHERE id = $1`
        return db.query(query, [eventId]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    create: (body) => {
        const query = `INSERT INTO payment_events (event_name, total_amount, event_creator_id, description, creation_date, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        return db.query(query, [body.event_name, body.total_amount, body.event_creator_id, body.description, body.creation_date, body.due_date]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });        
    },
    delete: (eventId) => {
        const query = `DELETE FROM challenges WHERE id = $1`;
        return db.query(query, [eventId]);        
    }
}

module.exports = PaymentEvents;