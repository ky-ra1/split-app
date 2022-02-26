const express = require('express');

// const db = require('./database/db');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
