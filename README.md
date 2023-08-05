# SQL Employee Tracker

## Description

This is a command line application that can help you manage and track your 
company's departments, roles, and employees. It would be inconvenient to use 
with even 50 employees. But at that point, you might just want to invest in some 
enterprise software. 

## Installation

- Download the code, open the root directory, run ```npm install```.
- Run the schema.sql file using MySQL.

## Usage

From the root directory, start the program via ```node index.js```. Use the arrow keys
to make your selections, and answer the prompts if offered. 

[Video demonstration of features](https://drive.google.com/file/d/1T2uffOE0NePGpus3kL0xRriMWCGXggEx/view?usp=sharing)

## Technologies Used

- JavaScript
- MySQL
- Node.js
- Inquirer.js
- mysql2.js


## Lessons Learned
- It is important to understand the exact data structure a function is returning to be able to work with it.
I lost a lot of time to figuring out that mysql2's .query() method returns an array of objects, where each object is a
row of the table, with columns as key/value pairs. 
- Using JOIN to link a table to itself is possible by 'creating' a second instance of the table with its own name.
But the SQL syntax gets very messy, very fast. 
- MySql2 doesn't allow callback functions on promisified queries. 