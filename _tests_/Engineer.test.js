const Engineer = require("../lib/Engineer");

test("Can set GitHub account via constructor", () => {
    const test_value = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@test.com", test_value);
    expect(e.github).toBe(test_value);
});

test("getRole() should return \"Engineer\"", () => {
    const test_value = "Engineer";
    const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser");

    expect(e.getRole()).toBe(test_value);

  });
  
test("Can get GitHub username via getGithub()", () => {
    const test_value = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@test.com", test_value);
    
    expect(e.getGithub()).toBe(test_value);
});