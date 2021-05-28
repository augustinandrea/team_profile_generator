const Intern = require("../lib/Intern");

test("Can you see the school?", ()=> {
    const test_value = "School_name";
    const i = new Intern("Foo", 1, "test@test.com", test_value);

    expect(i.school).toBe(test_value);
})