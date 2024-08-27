const dbPool = require("../db/connection");
const fs = require("fs/promises");
const { checkExists } = require("../utils/utils");

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

exports.accessArticleById = (article_id) => {
  return checkExists("articles", "article_id", article_id);
  // return dbPool
  //   .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
  //   .then(({ rows }) => {
  //     return rows;
  //   });
};
