const request = require("supertest");
const app = require("../app");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const dbPool = require("../db/connection");
const fs = require("fs/promises");

beforeEach(() => seed(data));
afterAll(() => dbPool.end());

describe("GET /api/topics", () => {
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

describe("GET /api", () => {
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

describe("GET /api/articles/:article_id", () => {
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

  test("test error is received when fed an incorrect id format", () => {
    return request(app).get("/api/article/l").expect(404);
  });

  test("test error is received when fed an incorrect url", () => {
    return request(app).get("/api/artocle/199").expect(404);
  });
});

describe("GET /api/articles", () => {
  test("receive an array with correct key value types", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        body.articles.forEach((article) => {
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(String));
        });
      });
  });

  test("receive an array with objects in descending order according to created_at key", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("receive code 404 when fed incorrect url", () => {
    return request(app).get("/api/articless").expect(404);
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("test that array of comments received have correct key value pairs", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("article_id", expect.any(Number));
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("body", expect.any(String));
        });
      });
  });

  test("receive an array with objects in descending order according to created_at key", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("receive code 404 when fed incorrect url", () => {
    return request(app).get("/api/articles/1/commen").expect(404);
  });

  test("receive code 404 when fed non existent article id", () => {
    return request(app).get("/api/articles/900/comment").expect(404);
  });

  test("receive code 404 when fed invalid article id", () => {
    return request(app).get("/api/articles/f/comment").expect(404);
  });
});

/*describe("POST /api/articles/:article_id/comments", () => {
  test("test post has successfully returned posted comment", () => {
    const postComment = { username: "butter_bridge", body: "Comment Here" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(postComment)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
      });
  });
});*/
