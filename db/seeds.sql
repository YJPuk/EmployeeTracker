INSERT INTO department (department_name)
('Administration'),
('Sales'),
('Finances'),
('Engineering'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Manager', 3000000, 1),
('Sales Lead', 1000000, 2),
('Salesperson', 500000, 2),
('Account Manager', 1000000, 3),
('Accountant', 500000, 3),
('Software Lead', 1000000, 4),
('Interface Designer', 500000, 4),
('Lawyer', 1000000, 5),
('Legal Assistant', 500000, 5); 

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES 
("Bob", "Bobby", 1, 1),
("Snowie", "Park", 2, 2),
("Jane", "Park", 3, 3),
("John", "Doe", 4, 4),
("Jane", "Smith", 5, 5),
("Sally", "Sixpack", 6, NULL),
("Ivan", "Petrov", 7, NULL),
("Michelle", "Dupont", 8, NULL),
("Mario", "Miyamoto", 9, NULL),
("Lina", "Kowalski", 10, NULL); 