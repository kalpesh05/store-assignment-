const request = require("supertest");
const app = require("../../app"); // your express app
let token = "";
let productId = "";

beforeAll(async () => {
  // Login to get token
  const res = await request(app).post("/api/login").send({
    email: "test@example.com",
    password: "Password123"
  });
  token = res.body.token;
});

describe("Product CRUD", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        price: 99.99,
        stock: 10,
        categoryId: "dummy-category-id"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    productId = res.body.data._id;
  });

  it("should get all products", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it("should get a single product", async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe(productId);
  });

  it("should update the product", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 79.99 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete the product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
