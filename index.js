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
async function getAllDepartments() {

    let allDepartments = await db.query('SELECT id AS "value", name AS "name" FROM departments ORDER BY name ASC;', function (err, results) {
        return results;
    });

};

getAllDepartments();
