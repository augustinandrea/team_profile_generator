const Manager = require("../lib/Manager");

test("Can set office number account via constructor", () => {
    const test_value = 1800;
    const m = new Manager("Foo", 1, "test@test.com", test_value);
    expect(m.officeNumber).toBe(test_value);
});

test("getRole() should return \"Manager\"", () => {
    const test_value = "Manager";
    const m = new Manager("Foo", 1, "test@test.com", 1800);

    expect(m.getRole()).toBe(test_value);

  });
  
test("Can get officer number via getOfficeNumber()", () => {
    const test_value = 1800;
    const m = new Manager("Foo", 1, "test@test.com", test_value);
    
    expect(m.getOfficeNumber()).toBe(test_value);
});