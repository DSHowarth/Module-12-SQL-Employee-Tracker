const db = require('mysql2');
const inquirer = require('inquirer');

const actionObject = {
    'View All Departments': db.query(`SELECT * FROM departments`,  (err, results) => {
        console.table(results)
    }), 
    'View All Roles': db.query(`SELECT * FROM roles`, (err, results) => {
        console.table(results)
    }), 
    'View All Employees': db.query(`SELECT * FROM employeees`, (err, results) => {
        console.table(results)
    }),
    'Add a Department': async () => {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new department:',
                name: 'deptName',
            }
        ])
    },
    'Add a Role': async () => {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new role:',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'Please enter the salary of the new role:',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'Please select the department for this role:',
                name: 'roleName',
            }
        ])
    },
    'Add an Employee': async () => {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the first name of the new employee:',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Please enter the last name of the new employee:',
                name: 'last_name',
            },
            {
                type: 'input',
                message: 'Please enter the role of the new employee:',
                name: 'role',
            },
            {
                type: 'input',
                message: "Please enter the name of the new employee's manager:",
                name: 'manager',
            }
        ])
    },
    'Update an Employee Role': ,
    'Exit' : exit()

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

}