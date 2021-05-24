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
function add_role(name, role, id, email) {
    let role_info = "";


    if (role === Engineer) {
        role_info = "Github username";
    }
    else if (role === Intern) {
        role_info = "School";
    }
    else {
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
            message: "Do you want to make more team members?",
            type: "list",
            choices: [
                "Yes I have another team member to input.",
                "No, I am finished with inputting team members."
            ]
        }
    ])
        .then(function (role_info, more_members) {
            let new_member;
            if (role === "Engineer") {
                new_member = new Engineer(name, id, email, role_info);
            }
            else if (role === "Intern") {
                new_member = new Intern(name, id, email, role_info);
            }
            else {
                new_member = new Manager(name, id, email, role_info);
            }

            employees.push(new_member);
            add_html(new_member)
                .then(function () {
                    if (more_members === "Yes I have another team member to input.") {
                        add_member();
                    }
                    else {
                        final_html();
                    }
                });

        });

}


function add_member() {
    inquirer.prompt(questions)
        .then(results => add_role(results))
}

// functions created for making HTML -------------------------------
function html() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile Generator</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function add_html() {

    return new Promise(function (resolve, reject) {
        //variables
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";

        // if statements 
        if (role === "Engineer") {
            const github = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${github}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./dist/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function final_html() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

// initialize the program
function init(){
    html();
    add_member();
}

init();