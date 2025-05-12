const request = require("supertest");
const app = require("../../app"); // your express app
let token = "";
let categoryId = "";

beforeAll(async () => {
  // Login to get token
  const res = await request(app).post("/api/login").send({
    email: "test@example.com",
    password: "Password123"
  });
  token = res.body.token;
});

describe("Category CRUD", () => {
  it("should create a category", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Electronics" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    categoryId = res.body.data._id;
  });

  it("should get all categories", async () => {
    const res = await request(app)
      .get("/api/categories")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should get one category", async () => {
    const res = await request(app)
      .get(`/api/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe(categoryId);
  });

  it("should update category", async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Electronics" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete category", async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
