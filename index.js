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
    }

]

// the given functions

// function for adding the different roles and the new sides
function add_role(name, role, id, email){
    let role_info = "";
    if(role === Engineer){
        role_info = "Github username";
    }
    else if(role === Intern ){
        role_info = "School";
    }
    else{
        role_info = "Office number";
    }

    inquirer.prompt([
        {
            name: "role_info",
            message: "Choose the team member's role info:",
            type: "input"
        },

        {
            name: "more_members",
            message: "Do you want to make more team members or stop?",
            type: "list",
            choices: [
                "Yes I have another team member to input.",
                "No, I am finished with inputting team members."
            ]
        }
    ])
    .then( function(role_info, more_members){
        let new_member;
        if(role === "Engineer"){
            new_member = new Engineer(name, id, email, role_info);
        }
        else if(role === "Intern"){
            new_member = new Intern(name, id, email, role_info);
        }
        else{
            new_member = new Manager(name, id, email, role_info);
        }

        employees.push(new_member);
        add_HTML(new_member)
        .then(function() {
            if(more_members === "Yes I have another team member to input."){
                add_member();
            }
            else{
                final_html();
            }
        }

    })

}


function add_member(){
    inquirer.prompt(questions)
    .then(results => add_role(results)))
}