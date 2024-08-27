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
    return request(app).get("/api/tapic").expect(404);
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

describe("/api/articles/:article_id", () => {
  test("test correct article is received when fed an existing article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("test error is received when fed a non existing article id", () => {
    return request(app)
      .get("/api/articles/199")
      .expect(404)
      .then(({ text }) => {
        expect(text).toEqual("Resource not found");
      });
  });

  test("test error is received when fed an incorrect url", () => {
    return request(app).get("/api/article/199").expect(404);
  });
});

describe("", () => {
  test("", () => {});
});
