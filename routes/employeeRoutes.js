const express = require('express');
const router = express.Router();
const dbModule = require('../dbConfig/dbConfig');

// GET route to fetch employees
router.get('/employees', (req, res) => {
    const query = `
        SELECT employee.*, role.role_name 
        FROM employee 
        JOIN role ON employee.employee_role_id = role.role_id`;

    dbModule.queryDatabase(query, [])
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error('Error querying the database: ' + err.message);
            res.status(500).send('Internal Server Error');
        });
});


// POST route to add a new employee
router.post('/add-employee', (req, res) => {
    const { firstName, lastName, employeeNumber, employeeSalary, employeeAddress, employeeRoleId } = req.body;

    if (!firstName || !lastName || !employeeNumber || !employeeSalary || !employeeAddress || !employeeRoleId) {
        return res.status(400).json({ message: 'Missing required employee fields' });
    }

    const query = `
        INSERT INTO employee 
        (employee_first_name, employee_last_name, employee_number, employee_salary, employee_address, employee_role_id) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    dbModule.queryDatabase(query, [firstName, lastName, employeeNumber, employeeSalary, employeeAddress, employeeRoleId])
        .then(result => {
            res.status(201).json({ message: 'Employee added', id: result.insertId });
        })
        .catch(err => {
            console.error('Error adding employee:', err);
            res.status(500).send('Internal Server Error');
        });
});

router.delete('/delete-employee/:employeeId', (req, res) => {
    const { employeeId } = req.params;

    const query = `DELETE FROM employee WHERE employee_id = ?`;

    dbModule.queryDatabase(query, [employeeId])
        .then(result => {
            res.json({ message: 'Employee deleted' });
        })
        .catch(err => {
            console.error('Error deleting employee:', err);
            res.status(500).send('Internal Server Error');
        });
});






module.exports = router;
