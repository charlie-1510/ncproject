const request = require("supertest");
const app = require("../app");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const dbPool = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => dbPool.end());

describe("/api/topics", () => {
  test("receive array of topics with correct key value types", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(Array.isArray(body.topics)).toBe(true);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });

  test("receive code 404 when fed incorrect url", () => {
    return request(app).get("/apo/topic").expect(404);
  });
});
