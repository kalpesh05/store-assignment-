// tests/integration/auth.test.js
const request = require("supertest");
const app = require("../../app"); // Your express app

describe("Auth API", () => {
  let token = "";

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        email: "test@example.com",
        password: "Password123",
        first_name: "Test",
        last_name: "User"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });

  it("should login and return token", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "Password123"
      });

    expect(res.statusCode).toBe(200);
    token = res.body.token;
    expect(token).toBeDefined();
  });

  it("should get my profile", async () => {
    const res = await request(app)
      .get("/api/user-profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});
