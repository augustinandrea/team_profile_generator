// Start require stuff needed
const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// array of questions that start being asked
const questions = [
    {
        name: "name",
        message: "Input the employee's name:",
        type: "input"
    },

    {
        name: "member_role",
        message: "Select the team member's job:",
        type: "list",
        choices: [
            "Engineer",
            "Manager",
            "Intern"
        ]
    },

    {
        name: "id",
        message: "Input the team member's ID:",
        type: "input"
    },

    {
        name: "email",
        message: "Input the team member's email address:",
        type: "input"
    }

]

// ----------------- the given functions ----------------------------------------
function add_member() {

    inquirer.prompt(questions)
        .then(function ( { name, member_role, id, email } ) {
            let role_info = "";

            if (member_role === "Engineer") {
                role_info = "github username";
            }
            else if (member_role === "Intern") {
                role_info = "school";
            }
            else if (member_role === "Manager") {
                role_info = "office number";
            }
            else {
                console.log("Don't be here. Here means wrong.")
            }

            inquirer.prompt( [
                {
                    name: "role_info",
                    message: `Enter the team member's ${role_info}:`,
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
                .then(function({ role_info, more_members }) {

                    let new_member;

                    if (member_role === "Engineer") {
                        new_member = new Engineer(name, id, email, role_info);
                    }
                    else if (member_role === "Intern") {
                        new_member = new Intern(name, id, email, role_info);
                    }
                    else if (member_role === "Manager") {
                        new_member = new Manager(name, id, email, role_info);
                    }
                    else {
                        console.log("Again, don't be here.");
                    }

                    // use the add_html function to implement a new member's html
                    add_html(new_member)
                        .then(function () {
                            if (more_members === "Yes I have another team member to input.") {
                                console.log("Adding a new member...");
                                add_member();
                            }
                            else {
                                end_html();
                            }
                        });

                });

    });
    
}

// functions created for making HTML -------------------------------
function html() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
        <link rel="stylesheet" href="./style.css">

        <title>Team Profile Generator</title>
    
    </head>
    
    <body>
        <nav class="navbar navbar-custom mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
                fs.writeFile("./dist/team.html", html, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log("Starting the process...");
}

// add the css
function css() {
    const css = `
        /* Modify the background color */
        .navbar-custom {
            background-color: rgb(223, 80, 80);
            height: 100px;
            margin: 10px 10px 10px 10px;
        }
    
        /* Modify brand and text color */
        .navbar-custom .navbar-brand,
        .navbar-custom .navbar-text {
            color: white;
            font-size: xx-large;
        }
            
        /*card overall design */
        .card{
            width: 18rem;
            box-shadow: 4px 4px 5px gray;
        }

        /*for the cards for the profiles*/
        .card-header{
            background-color: rgb(77, 77, 255);
            color: white;
        }

        .fa-fw{
            margin-right: 5px;
        }`;
    fs.writeFile("./dist/style.css", css, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

// adding the new html for each member
function add_html(member) {

    return new Promise( function (resolve, reject) {

        //variables
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";

        // if statements for the html depending on the role
        if (role === "Engineer") {
            const github = member.getGithub();

            data = `<div class="col-4 mt-4">
                <div class="card mx-auto mb-3">
                <h5 class="card-header">${name}<br /><br /><i class="fas fa-glasses fa-fw"></i>Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address:<a href = "mailto: ${email}"> ${email} </a></li>
                    <li class="list-group-item">GitHub:<a href = "https://github.com/${github}" target="_blank"> ${github}</a></li>
                </ul>
                </div>
            </div>`;
        } 
        else if (role === "Intern") {
            const school = member.getSchool();

            data = `<div class="col-4 mt-4">
                <div class="card mx-auto mb-3">
                <h5 class="card-header">${name}<br /><br /><i class="fas fa-user-graduate fa-fw"></i>Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address:<a href = "mailto: ${email} "> ${email} </a></li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
                </div>
            </div>`;
        } 
        else {
            const office_phone = member.getOfficeNumber();

            data = `<div class="col-4 mt-4">
                <div class="card mx-auto mb-3">
                <h5 class="card-header">${name}<br /><br /><i class="fas fa-mug-hot fa-fw"></i>Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address:<a href = "mailto: ${email} "> ${email} </a></li>
                    <li class="list-group-item">Office Phone: ${office_phone}</li>
                </ul>
                </div>
            </div>`
        }
        
        fs.appendFile("./dist/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
            });
    });
}

// the end html.
function end_html() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });

    // Finish the program. Say that it's done.
    console.log("The application has ended.");
}


// initialize the program
function init() {
    html();
    css();
    add_member();
}

init();