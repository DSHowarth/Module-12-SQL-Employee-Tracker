const mysql = require('mysql2');
const inquirer = require('inquirer');
const { actionObject } = require('./lib/actions.js')

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
    //call function associated with the user's selection
    await actionObject[userChoice.action]();
    //recursively call the prompt again to let them make another action.
    //Weirdly, without this setTimeout function, the recursive prompt will
    // appear above the console.table() and completely obliterate it when 
    // the user tries to make another selection. I didn't have time to 
    // dig into why, but this MacGyver'd solution works for now.
    setTimeout(() => {
        newUserAction();
    }, 1000);
    

}

newUserAction();