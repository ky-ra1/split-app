const express = require('express');
const Users = require('../../models/users');
const userCreateValidator = require("./create_user_validation");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/:id', (req, res) => {
    Users.getById(req.params.id).then((user) => {
        res.json(user);
    });
});

router.get('/getByUsername/:username', (req, res) => {
    Users.getByUsername(req.params.username).then((username) => {
        res.json(username);
    });
});

router.get('/getByEmail/:email', (req, res) => {
    Users.getByEmail(req.params.email).then((email) => {
        res.json(email);
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    Users.create(user).then((user) => {
        res.json(user);
    });
});

module.exports = router;
