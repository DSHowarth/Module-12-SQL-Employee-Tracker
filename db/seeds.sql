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
    ('Joe', 'Trouble', 2, 1);

