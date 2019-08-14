const request = require("supertest");
const app = require("./app");

describe("Test the books path", () => {
  test("It should respond 404 to the GET method with an unknown book ID", async () => {
    const response = await request(app).get("/books?bookId=xyz");

    expect(response.statusCode).toBe(404);
  });

  test("It should add a book via POST", async () => {
    const response = await request(app)
      .post("/books")
      .send({ bookId: 123, bookTitle: "My Book Title" });

    expect(response.statusCode).toBe(200);
  });

  test("It should retrieve the added book via GET", async () => {
    const response = await request(app).get("/books?bookId=123");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ bookTitle: "My Book Title" });
  });
});
