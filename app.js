const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
} = require("./controllers/news.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use((err, request, response, next) => {
  response.status(err.status).send(err.msg);
});

module.exports = app;
