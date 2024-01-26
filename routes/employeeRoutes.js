const express = require('express');
const router = express.Router();
const dbModule = require('../dbConfig/dbConfig'); 


router.get('/employees', (req, res) => {
    dbModule.queryDatabase('SELECT * FROM employee', [])
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error('Error querying the database: ' + err.message);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
