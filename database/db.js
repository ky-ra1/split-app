const pg = require('pg');

let db;
if (process.env.NODE_ENV === 'production') {
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new pg.Pool({
        database: 'my_local_database_name', //TODO Change based on db name
    });
}

module.exports = db;
