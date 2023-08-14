INSERT INTO department (department_name) VALUES
('Administration'),
('Sales'),
('Finances'),
('Engineering'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Manager', 3000000, 1),
('Personal Assistant', 500000, 2),
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
("Olive", "Park", 3, 3),
("John", "Doe", 4, 4),
("Jane", "Smith", 5, 5),
("Sally", "Sixpack", 6, 1),
("Ivan", "Petrov", 7, 2),
("Michelle", "Dupont", 8, 3),
("Mario", "Miyamoto", 9, 4),
("Lina", "Kowalski", 10, 5); 