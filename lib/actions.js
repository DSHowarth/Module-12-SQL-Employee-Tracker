const mysql = require('mysql2');
const inquirer = require('inquirer');

//initialize connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db',
    password: 'L76q7ojrTe4E$yLK',
  });

//contains keys for all actions user can take.
const actionObject = {

    // display table of departments and dept ids
    'View All Departments': async () => { 
        db.query(`SELECT * FROM departments`,  (err, results) => {
        console.table(results);
    })}, 

    // display table of roles, with department names filled in 
    'View All Roles': async () => {db.query('SELECT roles.id, title, salary, departments.dept_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, results) => {
        console.table(results);
    })}, 

    // display table of employees, with their role, salary, department, and manager filled in via JOINs
    'View All Employees': async () => {db.query(`    
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id 
        LEFT JOIN departments ON roles.department_id = departments.id 
        LEFT JOIN employees managers ON employees.manager_id = managers.id`, (err, results) => {
        console.table(results);
    })},

    'Add a Department': async () => {
        //prompt user for additional info
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new department:',
                name: 'deptName',
            }
        ])
        // add new dept to database
        db.query('INSERT INTO departments (dept_name) VALUES (?)', [response.deptName], (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Department successfully created')
        })
        
    },

    'Add a Role': async () => {
        // pulling department name and ID from depts
        const depts = await db.promise().query('SELECT id, dept_name FROM departments')
        // extracting an array of department names from the query response
        let deptNames = depts[0].map((row) => row['dept_name'])
        //prompt user for additional info
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
        // match chosen dept name to id
        const deptID = depts[0].find((row) => row['dept_name'] === response.deptName).id;
        //add new role to database
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [response.roleName, response.salary, deptID], (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Role successfully created')
        })
        
    },

    'Add an Employee': async () => {
        // We have to pull both managers and role titles as we did for departments above. We get an array of objects with ids and names as key/value pairs
        // then we extract the names into an array for use in our list prompt. We concat the manager names for readability
        let managers = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) FROM employees AS fullName');
        managerNames = managers[0].map(row => row['CONCAT(first_name, " ", last_name)']);
        // add a 'None' option to list of managers
        managerNames.unshift('None');

        let roles = await db.promise().query('SELECT id, title FROM roles');
        let roleTitles = roles[0].map(row => row['title']);


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
                // use the list we created above as input options
                choices: roleTitles
            },
            {
                type: 'list',
                message: "Please select the new employee's manager:",
                name: 'manager',
                choices: managerNames
            }
        ])
        // handling a 'None' selection.
        let managerID;
        if(response.manager == 'None'){
            managerID = null;
        }
        else{
            // if we picked anyone, match them to their id
            managerID = managers[0].find((row) => row['CONCAT(first_name, " ", last_name)'] === response.manager).id;
        }
        const roleID = roles[0].find((row) => row.title === response.role).id;
        // add new employee to the database
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', 
            [response.firstName, response.lastName, roleID, managerID], (err, results) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Employee successfully created')
            })
    },

    'Update an Employee Role': async () => {
        // As above, pull a list of employee names and IDs, extract a usable array of names, do the same with role titles
        let employees = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) FROM employees AS fullName');
        let employeeNames = employees[0].map(row => row['CONCAT(first_name, " ", last_name)']);

        let roles = await db.promise().query('SELECT id, title FROM roles');
        let roleTitles = roles[0].map(row => row['title']);

        const response = await inquirer.prompt([
            {
                type:'list',
                message: 'Please select an employee:',
                name: 'employee',
                choices: employeeNames
            },
            {
                type:'list',
                message: 'Please select a new role:',
                name: 'role',
                choices: roleTitles
            }
        ])
        // match selections to ids, update DB
        const roleID = roles[0].find((row) => row.title === response.role).id;
        const employeeID = employees[0].find((row) => row['CONCAT(first_name, " ", last_name)'] === response.employee).id;
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleID, employeeID], (err, results) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Update successful')
            })

    },

    // Give the user an exit option in case they don't know the hotkey
    'Exit' : () => {
        process.exit();
    }

}

module.exports = { actionObject }