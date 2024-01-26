async function fetchAndDisplayEmployees(event) {
    if (event) event.preventDefault();

    try {
        const response = await fetch("/employees");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const table = document.getElementById("employeeTable");
        table.innerHTML = "";

        let header = table.createTHead();
        let headerRow = header.insertRow(0);
        headerRow.insertCell(0).innerHTML = "<b>First Name</b>";
        headerRow.insertCell(1).innerHTML = "<b>Last Name</b>";
        headerRow.insertCell(2).innerHTML = "<b>Employee Number</b>";
        headerRow.insertCell(3).innerHTML = "<b>Salary</b>";
        headerRow.insertCell(4).innerHTML = "<b>Address</b>";
        headerRow.insertCell(5).innerHTML = "<b>Role</b>"; // Add a header for the role

        data.forEach((employee) => {
            let row = table.insertRow();
            row.insertCell(0).textContent = employee.employee_first_name;
            row.insertCell(1).textContent = employee.employee_last_name;
            row.insertCell(2).textContent = employee.employee_number;
            row.insertCell(3).textContent = employee.employee_salary;
            row.insertCell(4).textContent = employee.employee_address;
            row.insertCell(5).textContent = employee.role_name; // Display the role name

            let deleteCell = row.insertCell(6); // Adjust the index as needed
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger"; // Bootstrap class for styling
            deleteButton.onclick = function() { deleteEmployee(employee.employee_id); };
            deleteCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


async function addEmployee(event) {
    if (event) event.preventDefault();
    const employeeData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        employeeNumber: document.getElementById('employeeNumber').value,
        employeeSalary: document.getElementById('employeeSalary').value,
        employeeAddress: document.getElementById('employeeAddress').value,
        employeeRoleId: document.getElementById('employeeRoleId').value
    };

    try {
        const response = await fetch('/add-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await fetchAndDisplayEmployees(); // Call without passing an event
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

async function deleteEmployee(employeeId) {
    try {
        const response = await fetch(`/delete-employee/${employeeId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchAndDisplayEmployees(); // Refresh the employee list
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const showEmployeesForm = document.getElementById('showEmployeesForm');
    if (showEmployeesForm) {
        showEmployeesForm.addEventListener('submit', fetchAndDisplayEmployees);
    }

    const addEmployeeForm = document.getElementById('addEmployeeForm');
    if (addEmployeeForm) {
        addEmployeeForm.addEventListener('submit', addEmployee);
    }

    // Any additional code needed...
});