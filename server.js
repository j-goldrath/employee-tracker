// Import modules inquirer and mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

// Connection configuration for database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'sqltesting123',
        database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

// Function that returns array of all department names currently in departments table of db
function getAllDepartments() {

    // Query database
    return db.query('SELECT name FROM departments ORDER BY name ASC;', function (err, results) {
        return results;
    });
};

// Function that returns array of all role names currently in roles table of db
function getAllRoles() {

    // Query database
    return db.query('SELECT title FROM roles ORDER BY department_id ASC;', function (err, results) {
        return results;
    });
};

// Function that returns array of all employess currently in employees table of db
function getAllEmployees() {

    // Query database
    return db.query('SELECT name FROM departments ORDER BY id ASC;', function (err, results) {
        return results;
    });

};

// Show departments table in console
function viewAllDepartments() {

    // Query database
    db.query('SELECT id AS "ID", name AS "Department" FROM departments ORDER BY id ASC;', function (err, results) {
        console.table(results);
        askWhatToDo();
    });
}

// Show roles table in console
function viewAllRoles() {

    // Query database
    db.query('SELECT roles.id AS "ID", roles.title AS "Title", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY id ASC;', function (err, results) {
        console.table(results);
        askWhatToDo();
    });
}

// Show employees table in console
function viewAllEmployees() {

    // Query database
    db.query('SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", roles.title AS "Title", departments.name AS "Department", roles.salary AS "Salary", IFNULL (CONCAT(m.last_name, ", ", m.first_name), "-N/A-") AS "Manager" FROM employees e JOIN roles ON e.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY id ASC;', function (err, results) {
        console.table(results);
        console.log(err);
        askWhatToDo();
    });
}

// Prompt user to select what they would like to do from list of options
function askWhatToDo() {

    const whatToDo = [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            name: 'whatNext',
        },
    ];

    inquirer
        .prompt(whatToDo)
        .then((response) => {

            switch (response.whatNext) {
                case 'View all departments':
                    viewAllDepartments()
                    return;
                case 'View all roles':
                    viewAllRoles();
                    return;
                case 'View all employees':
                    viewAllEmployees();
                    return;
                case 'Add a department':
                    addDepartment();
                    return;
                case 'Add a role':
                    addRole();
                    return;
                case 'Add an employee':
                    addEmployee();
                    return;
                case 'Update an employee role':
                    updateEmployeeRole();
                    return;
            }

        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log(error)
            }
        });
};

// Add a department function
async function addDepartment() {

    const departmentPrompt = [
        {
            type: 'input',
            message: 'Please enter a name for this new department:',
            name: 'newDepartment',
        },
    ];

    await inquirer
        .prompt(departmentPrompt)
        .then((response) => {

            if (response.newDepartment) {
                addDepartmentToDb(response.newDepartment);
            } else {
                console.log('Department name cannot be left blank!');
                addDepartment();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log(error)
            }
        });

    askWhatToDo();

};

// Add a role function
async function addRole() {

    let departments = await getAllDepartments();

    const rolePrompt = [
        {
            type: 'input',
            message: 'Please enter a name for this new role:',
            name: 'newRole',
        },
        {
            type: 'input',
            message: "Please enter a yearly salary for this role (in dollars and cents, without commas, eg. 50000.00):",
            name: 'newRoleSalary',
        },
        {
            type: 'list',
            message: "Please select the department this role will belong to:",
            choices: departments,
            name: 'newRoleDepartment',
        },
    ];

    await inquirer
        .prompt(rolePrompt)
        .then((response) => {

            if (response.newRole && response.newRoleSalary && response.newRoleDepartment) {
                addRoleToDb(response.newRole, response.newRoleSalary, response.newRoleDepartment);
            } else {
                console.log('Invalid and/or missing role information, please try again!');
                addRole();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log(error)
            }
        });

    askWhatToDo();

};

// Add an employee function
async function addEmployee() {

    let roles = await getAllRoles();
    let employees = await getAllEmployees();

    const employeePrompt = [
        {
            type: 'input',
            message: "Please enter new employee's first name:",
            name: 'newEmployeeFirstName',
        },
        {
            type: 'input',
            message: "Please enter new employee's last name:",
            name: 'newEmployeeLastName',
        },
        {
            type: 'list',
            message: "Please select a role for the new employee:",
            choices: roles,
            name: 'newEmployeeRole',
        },
        {
            type: 'list',
            message: "Please select a manager for this new employee if desired:",
            choices: employees,
            name: 'newEmployeeManager',
        },
    ];

    await inquirer
        .prompt(employeePrompt)
        .then((response) => {

            if (response.newEmployeeFirstName && response.newEmployeeLastName && response.newEmployeeRole) {
                addRoleToDb(response.newRole, response.newRoleSalary, response.newRoleDepartment);
            } else {
                console.log('Invalid and/or missing role information, please try again!');
                addRole();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log(error)
            }
        });

    askWhatToDo();

};

// Update/change an employee's designated role
// function updateEmployeeRole() {

// };

// Function that takes name of department to add as argument and then adds that department to departments table of comapny db
function addDepartmentToDb(departmentName) {

    // Insert new department into departments table
    db.query(`INSERT INTO departments (name) VALUES ("${departmentName}");`, function (err, results) {
        if (err) throw err;
        console.log(`${departmentName} was succesfully added to departments!`);
        askWhatToDo();
    });

};

// Function that takes name of new role, salary, and department as arguments and then adds that role to roles table in company db
function addRoleToDb(roleName, roleSalary, roleDepartmentId) {

    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${roleName}", ${roleSalary}, ${roleDepartmentId});`, function (err, results) {
        if (err) throw err;
        console.log(`${roleName} was succesfully added to roles!`);
        askWhatToDo();
    });

};

// Function that takes new employee's first name, last name, role, and manager as arguments and adds employee info to employees table of company db
function addEmployeeToDb(firstName, lastName, roleId, managerId) {

    db.query(`INSERT INTO employees (first_name, last_name, department_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`, function (err, results) {
        if (err) throw err;
        console.log(`${firstName} ${lastName} was succesfully added to employees!`);
        askWhatToDo();
    });

};



askWhatToDo();