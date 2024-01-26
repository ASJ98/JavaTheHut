async function fetchAndDisplayEmployees(event) {
    event.preventDefault();

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

        data.forEach((employee) => {
            let row = table.insertRow();
            row.insertCell(0).textContent = employee.employee_first_name;
            row.insertCell(1).textContent = employee.employee_last_name;
            row.insertCell(2).textContent = employee.employee_number;
            row.insertCell(3).textContent = employee.employee_salary;
            row.insertCell(4).textContent = employee.employee_address;
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
