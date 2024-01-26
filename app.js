require('dotenv').config();
const express = require('express');
const dbModule = require('./dbConfig/dbConfig.js');
const employeeRoutes = require('./routes/employeeRoutes.js');
const path = require('path'); // Use require for path

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');

// Initialize the database connection pool
dbModule.initializeDatabaseConnection();


// app.js
app.use(express.static(path.join(__dirname, 'views')));
app.use('/jsHandlers', express.static(path.join(__dirname, 'jsHandlers')));

// Use the employee routes
app.use(employeeRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
