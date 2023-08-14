//Dependencies
const express = require('express');
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    password: "",
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
          addRoles();
    
        }
        else if(answer.selection === "Add Roles") {
          addDepartments();
    
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

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  