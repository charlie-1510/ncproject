const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/news.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use((err, request, response, next) => {
  console.log(err);
});

module.exports = app;
