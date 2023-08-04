DROP DATABASE Company_db;
CREATE DATABASE Company_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    dept_name VARCHAR(30),
)

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
)

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id)
    first_name VARCHAR(30);
    last_name VARCHAR(30);
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES (employees.id)
)