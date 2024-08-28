const dbPool = require("../db/connection");
const fs = require("fs/promises");
const { checkExists, checkIfNum } = require("../utils/utils");

exports.accessTopics = () => {
  return dbPool.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.accessEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    return data;
  });
};
exports.accessArticles = () => {
  return dbPool
    .query(
      "select articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, count(comments.article_id) as comment_count from articles left join comments on comments.article_id = articles.article_id group by articles.article_id order by articles.created_at desc"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.accessArticleById = (article_id) => {
  return checkExists("articles", "article_id", article_id).then((result) => {
    return result[0];
  });
};

exports.accessCommentsByArticleId = (article_id) => {
  return checkExists("comments", "article_id", article_id, "created_at", true);
};
