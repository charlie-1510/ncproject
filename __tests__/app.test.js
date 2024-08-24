const request = require("supertest");
const app = require("../app");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const dbPool = require("../db/connection");
const fs = require("fs/promises");

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

describe("/api", () => {
  test("test that contents of endpoints.json received match file", () => {
    let result;
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const { body } = response;
        result = body.endpoints;
        return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8");
      })
      .then((file) => {
        expect(result).toEqual(file);
      });
  });
});
