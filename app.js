const express = require("express");
const app = express();
const { getTopics } = require("./controllers/news.controllers");

app.get("/api/topics", getTopics);

app.use((err, request, response, next) => {
  console.log(err);
});

module.exports = app;
