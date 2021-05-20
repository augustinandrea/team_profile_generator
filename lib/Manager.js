class Manager{
    constructor(name, id, email);

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Manager";
    }
}

module.exports = Employee;