const { query } = require('../dbConnection/dbCon');

const getEmployees = (req, res) => {
    query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

const addEmployee = (req, res) => {
    const { employee_first_name, employee_last_name, employee_number, employee_salary, employee_address } = req.body;
    const sql = 'INSERT INTO employee (employee_first_name, employee_last_name, employee_number, employee_salary, employee_address) VALUES (?, ?, ?, ?, ?)';
    query(sql, [employee_first_name, employee_last_name, employee_number, employee_salary, employee_address], (err, results) => {
        if (err) {
            console.error('Error adding employee: ' + err.message);
            res.status(500).send('Error adding employee');
            return;
        }
        res.status(200).json({ message: 'Employee added successfully', employeeId: results.insertId });
    });
};

module.exports = { getEmployees, addEmployee };
