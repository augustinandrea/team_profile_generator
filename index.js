const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

const questions = [
    {
        name: "employee_name",
        message: "Input the employee's name:",
        type: "input"
    },

    {
        name: "team_role",
        message: "Select the team member's job:",
        type: "list",
        choices: [
            Engineer,
            Manager,
            Intern
        ]
    },

    {
        name: "member_id",
        message: "Input the team member's ID:",
        type: "input"
    },

    {
        name: "member_email",
        message: "Input the team member's email address:",
        type: "input"
    },

    {
        name: "continue_or_stop",
        message: "Do you want to make more team members or stop?",
        type: "list",
        choices: [
            "Yes I have another team member to input.",
            "No, I am finished with inputting team members."
        ]
    }
]

// the given functions

function add_member(){
    inquirer.prompt(questions)
    .then(function(name, role, id, email){
        
    })
}