const express = require('express');
const Users = require('../../models/users');

const router = express.Router();

router.get('/:id', (req, res) => {
    Users.getById(req.params.id).then((user) => {
        res.json(user);
    });
});

router.get('/getByUsername', (req, res) => {
    Users.getByUsername(req.body.username).then((username) => {
        res.json(username);
    });
});

router.get('/getByEmail', (req, res) => {
    Users.getByEmail(req.body.email).then((email) => {
        res.json(email);
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    Users.create(user).then((user) => {
        res.json(user);
    });
});
