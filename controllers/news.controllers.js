const {
  accessTopics,
  accessEndpoints,
  accessArticleById,
  accessArticles,
} = require("../models/news.models");

exports.getTopics = (request, response, next) => {
  accessTopics()
    .then((topicData) => {
      response.status(200).send({ topics: topicData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (request, response, next) => {
  accessEndpoints()
    .then((endpointData) => {
      response.status(200).send({ endpoints: endpointData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (request, response, next) => {
  accessArticles()
    .then((articlesData) => {
      console.log(articlesData, "<--- article data");
      response.status(200).send({ articles: articlesData });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticleById = (request, response, next) => {
  const { params } = request;
  accessArticleById(params.article_id)
    .then((articleData) => {
      response.status(200).send({ article: articleData[0] });
    })
    .catch((err) => {
      next(err);
    });
};
