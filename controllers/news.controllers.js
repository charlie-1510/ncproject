const {
  accessTopics,
  accessEndpoints,
  accessArticleById,
  accessArticles,
  accessCommentsByArticleId,
  insertCommentsByArticleId,
  updateArticleById,
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
      response.status(200).send({ article: articleData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (request, response, next) => {
  const { params } = request;
  accessCommentsByArticleId(params.article_id)
    .then((commentsData) => {
      response.status(200).send({ comments: commentsData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (request, response, next) => {
  const { body, params } = request;
  insertCommentsByArticleId(body, params)
    .then((postedComment) => {
      response.status(201).send({ "comment_posted": postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (request, response, next) => {
  const { body, params } = request;
  updateArticleById(body, params)
    .then((updatedArticle) => {
      response.status(202).send({ "updated_votes": updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
