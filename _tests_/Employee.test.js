const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
});
  
test("Can set name via constructor arguments", () => {
    const name = "Alice";
    const e = new Employee(name);
    expect(e.name).toBe(name);
});
  
test("Can set id via constructor argument", () => {
    const test_value = 100;
    const e = new Employee("Foo", test_value);
    expect(e.id).toBe(test_value);
});
  
test("Can set email via constructor argument", () => {
    const test_value = "test@test.com";
    const e = new Employee("Foo", 1, test_value);
    expect(e.email).toBe(test_value);
});
  
test("Can get name via getName()", () => {
    const test_value = "Alice";
    const e = new Employee(test_value);

    expect(e.getName()).toBe(test_value);
});
  
test("Can get id via getId()", () => {
    const test_value = 100;
    const e = new Employee("Foo", test_value);
    expect(e.getId()).toBe(test_value);
});
  
test("Can get email via getEmail()", () => {
    const test_value = "test@test.com";
    const e = new Employee("Foo", 1, test_value);
    expect(e.getEmail()).toBe(test_value);
});
  
test("getRole() should return \"Employee\"", () => {
    const test_value = "Employee";
    const e = new Employee("Alice", 1, "test@test.com");
    expect(e.getRole()).toBe(test_value);
});