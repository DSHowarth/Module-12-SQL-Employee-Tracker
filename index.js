const mysql = require('mysql2');
const inquirer = require('inquirer');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db',
    password: 'L76q7ojrTe4E$yLK',
  });
  

const actionObject = {
    'View All Departments': async () => { 
        db.query(`SELECT * FROM departments`,  (err, results) => {
        console.table(results);
    })}, 
    'View All Roles': async () => {db.query('SELECT * FROM roles', (err, results) => {
        console.table(results);
    })}, 
    'View All Employees': async () => {db.query('SELECT * FROM employees', (err, results) => {
        console.table(results);
    })},
    'Add a Department': async () => {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new department:',
                name: 'deptName',
            }
        ])
        db.query('INSERT INTO departments (dept_name) VALUES (?)', [response.deptName], (err, results) => {
            console.log('Department added successfully');
        })
    },
    'Add a Role': async () => {
        const deptNames = db.query({sql: 'SELECT dept_name FROM departments', rowsAsArray: true})
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new role:',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'Please enter the salary of the new role:',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Please select the department for this role:',
                name: 'deptName',
                choices: deptNames
            }
        ])
        const deptID =db.query(`SELECT id FROM departments WHERE dept_name = ${reponse.deptName}`)
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, 
            [response.roleName, response.salary, deptID]), (err, results) => {
                console.log('Role successfully added');
        }
    },
    'Add an Employee': async () => {
        let managerNames = await db.promise().query('SELECT id, CONCAT(first_name, last_name) FROM employees AS fullName');
        managerNames = managerNames[0].map(a => a['CONCAT(first_name, last_name)']);
        // managerNames.unshift('None');
        let roleTitles = await db.promise().query('SELECT title FROM roles');
        roleTitles = roleTitles[0].map(a => a['title']);


        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the first name of the new employee:',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Please enter the last name of the new employee:',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'Please select the role of the new employee:',
                name: 'role',
                choices: roleTitles
            },
            {
                type: 'list',
                message: "Please select the new employee's manager:",
                name: 'manager',
                choices: managerNames
            }
        ])
        const managerID = db.query(`SELECT id FROM employees WHERE dept_name = ?`, [response.manager]);
        const roleID = db.query(`SELECT id FROM roles WHERE title = ?`, [response.role]);
        db.query('INSERT INTO employees (first_name, last_name, role, manager_id) VALUES (?,?,?,?)', 
            [response.firstName, response.lastName, response.role, managerID], (err, results) => {
                console.log('Employee successfully added')
            })
    },
    // 'Update an Employee Role': ,
    'Exit' : () => {
        process.exit();
    }

}

const newUserAction = async function () {
    const userChoice = await inquirer.prompt([
        {
            type: 'list',
            message: 'I want to:',
            name: 'action',
            choices: [
                'View All Departments', 
                'View All Roles', 
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ],
        }
    ])
    await actionObject[userChoice.action]();
    setTimeout(() => {
        newUserAction();
    }, 1000);
    

}

newUserAction();