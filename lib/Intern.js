class Intern{
    constructor(name, id, email, school);

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Employee;