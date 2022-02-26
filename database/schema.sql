-- DB Name: split-app
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    username VARCHAR(20),
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE payment_events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(20),
    total_amount NUMERIC,
    event_creator_id INTEGER,
    description TEXT,
    creation_date DATE,
    due_date DATE
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    amount NUMERIC,
    paid_status BOOLEAN,
    recieved_status BOOLEAN,
    paid_date DATE,
    payment_event_id INTEGER
);

ALTER TABLE payment_events
ADD CONSTRAINT fk_creator_id
FOREIGN KEY(event_creator_id)
REFERENCES payments(id);

ALTER TABLE payments
ADD CONSTRAINT fk_user_id
FOREIGN KEY(user_id)
REFERENCES users(id);

ALTER TABLE payments 
ADD CONSTRAINT fk_event_id
FOREIGN KEY(payment_event_id)
REFERENCES payment_events(id);