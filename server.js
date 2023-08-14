//Dependencies
const express = require('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");
const conTable = require("console.table");

//Port
const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
{
    host: "localhost", 
    user: "root",
    password: "hell0",
    database: "employees_db"
},
    console.log(`Connected to the employees_db database.`)
);

//Function for starting the Employee Tracker 
function startTracker() {
    inquirer
      .prompt({
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: 
          [
            "View All Departments",
            "View All Roles", 
            "View All Employees",
            "Add Departments",
            "Add Roles", 
            "Add Employees",
            "Update an employees' Role",
          ]
      })
      .then(function(answer) {
          console.log(answer);
        
        if (answer.selection === "View All Departments") {
          viewDepartments();
        }
        else if(answer.selection === "View All Roles") {
          viewRoles();
    
        } 
        else if(answer.selection === "View All Employees") {
          viewEmployees();
    
        }
        else if(answer.selection === "Add Departments") {
          addDepartments();
    
        }
        else if(answer.selection === "Add Roles") {
          addRoles();
    
        }
        else if(answer.selection === "Add Employees") {
          addEmployees();
    
        }
        else if(answer.selection === "Update an employees' Role") {
          updateRole();
    
        }else{
          db.end();
        }
      });
};

//Function for each option selected
//View All Departments
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startTracker();
    });
};

// View All Roles
function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startTracker();
    });
};

// View All Employees
function viewEmployees() {
    const sql = `SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                employee.role_id, 
                employee.manager_id, 
                role.title, 
                role.salary, 
                role.id, 
                department.id FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id 
                LEFT JOIN department 
                ON role.department_id = department.id`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startTracker();
    });
};

// Add a role
function addRoles() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the role title you want to add"
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary of said role (numbers only)"
        },
        {
            name: "department_id",
            type: "number",
            message: "Please enter the department id of the role"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.department_id], function (err, data) {
            if (err) throw err;
            console.log('Successfully added!');

            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startTracker();
                }
                console.table(result);
                startTracker();
            });
        })
});
};

// Add departments
function addDepartments() {
    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Please enter the department name you want to add"
        }
    ]).then((answer) => {

    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = [answer.department_name];
    db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log('Successfully added!');

        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return;
            }
            console.table(result);
            startTracker();
        });
    });
});
};



// Add employees
function addEmployees() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the employee's first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter the employee's last name"
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the employee's role id (numbers only)"
        },
        {
            name: "manager_id",
            type: "number",
            message: "Please enter the employee's manager id (numbers only)"
        }

    ]).then(function (answer) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, data) {
            if (err) throw err;
            console.log('Successfully added!');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startTracker();
                }
                console.table(result);
                startTracker();
            });
        })
});
};

// Update employee Role
function updateRole() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want to update"
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the employee's new role id (numbers only)"
        }
    ]).then(function (answer) {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.manager_id, answer.first_name], function (err, data) {
            if (err) throw err;
            console.log("Successfully updated");

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startTracker();
                }
                console.table(result);
                startTracker();
            });
        })
});
};




// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startTracker();