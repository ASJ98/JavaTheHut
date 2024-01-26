const express = require('express');
const router = express.Router();
const dbModule = require('../dbConfig/dbConfig'); 


router.get('/employees', (req, res) => {
    dbModule.queryDatabase('SELECT * FROM employee', [])
        .then(results => {
            res.render('employeeViews', results);
        })
        .catch(err => {
            console.error('Error querying the database: ' + err.message);
            res.status(500).send('Internal Server Error');
        });
});
router.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    let results = "";

    let details = req.body;

    if (req.body.email == results.email && req.body.password == results.password) {
        res.render('employeeViews');
    } else {
        res.redirect('login');
    }
});

module.exports = router;