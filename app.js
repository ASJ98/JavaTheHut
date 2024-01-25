const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kainos', // Your database name
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Connected to the database');
});

// Define a route to display employees
app.get('/employees', (req, res) => {
    // Query the database to fetch employees
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the list of employees as JSON data
        res.json(results);
    });
});

// Serve the HTML file for the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/employeeViews.html');
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
