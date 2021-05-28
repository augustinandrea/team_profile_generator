const Intern = require("../lib/Intern");

test("Can set school name via constructor", ()=> {
    const test_value = "school_name";
    const i = new Intern("Foo", 1, "test@test.com", test_value);

    expect(i.school).toBe(test_value);
});

test("getRole() should return \"Intern\"", () => {
    const test_value = "Intern";
    const i = new Intern("Foo", 1, "test@test.com", "school_name");

    expect(i.getRole()).toBe(test_value);

});

test("Can get school via getSchool()", () => {
    const test_value = "University of Notre Dame";
    const i = new Intern("Foo", 1, "test@test.com", test_value);

    expect(i.getSchool(test_value));
})