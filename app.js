require('dotenv').config();
const express = require('express');
const dbModule = require('./dbConfig/dbConfig.js');
const employeeRoutes = require('./routes/employeeRoutes.js');
const path = require('path'); // Use require for path

const app = express();
app.use(express.urlencoded({ extended: true })); // This line is important

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

// Initialize the database connection pool
dbModule.initializeDatabaseConnection();

// Use the employee routes
app.use(employeeRoutes);

// app.js
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jsHandlers', express.static(path.join(__dirname, 'jsHandlers')));


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
