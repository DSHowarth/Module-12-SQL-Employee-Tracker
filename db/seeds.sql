INSERT INTO departments (dept_name)
VALUES 
    ('Testing'),
    ('Troubleshooting');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Tester', 130000, 1),
    ('Troubleshooter', 10, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Bill', 'Testers', 2, null),
    ('Joe', 'TRouble', 2, 1);

    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS managers
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees managers ON employees.manager_id = managers.id

    SELECT employees.first_name, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN employees managers ON employees.manager_id = managers.id