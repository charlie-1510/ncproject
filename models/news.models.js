const dbPool = require("../db/connection");
const fs = require("fs/promises");
const { checkExists, checkIfNum } = require("../utils/utils");
const format = require("pg-format");

exports.accessEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    return JSON.parse(data);
  });
};

exports.accessTopics = () => {
  return dbPool.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.accessUsers = () => {
  return dbPool.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

exports.accessArticles = (sort_by = "created_at", order = "desc", topic) => {
  let qryStr;
  greenColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
    "article_img_url",
  ];
  if (greenColumns.includes(sort_by) && (order === "desc" || order === "asc")) {
    qryStr = format(
      "select articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, count(comments.article_id) as comment_count from articles left join comments on comments.article_id = articles.article_id"
    );
    if (topic) {
      return checkExists("articles", "topic", topic).then(() => {
        qryStr += format(" where topic = %L", topic);
        qryStr += format(" group by articles.article_id");
        qryStr += format(" order by %I %s", sort_by, order);
        return dbPool.query(qryStr).then(({ rows }) => {
          return rows;
        });
      });
    }

    qryStr += format(" group by articles.article_id");
    qryStr += format(" order by %I %s", sort_by, order);
    return dbPool.query(qryStr).then(({ rows }) => {
      return rows;
    });
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};

exports.accessArticleById = (article_id) => {
  if (checkIfNum(article_id)) {
    return checkExists("articles", "article_id", article_id).then((result) => {
      return result[0];
    });
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};

exports.accessCommentsByArticleId = (article_id) => {
  if (checkIfNum(article_id)) {
    return checkExists(
      "comments",
      "article_id",
      article_id,
      "created_at",
      true
    );
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};

exports.insertCommentsByArticleId = ({ username, body }, { article_id }) => {
  if (username && body && checkIfNum(article_id)) {
    return checkExists("articles", "article_id", article_id)
      .then(() => {
        return checkExists("users", "username", username);
      })
      .then(() => {
        queryStr = format(
          "INSERT INTO comments (body, author, article_id, votes) VALUES (%L) RETURNING *;",
          [body, username, article_id, 0]
        );
        return dbPool.query(queryStr).then((result) => {
          return result.rows;
        });
      });
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};

exports.updateArticleById = ({ inc_votes }, { article_id }) => {
  if (checkIfNum(inc_votes) && checkIfNum(article_id)) {
    return checkExists("articles", "article_id", article_id)
      .then(() => {
        queryStr = format("SELECT votes FROM articles WHERE article_id = %L;", [
          article_id,
        ]);
        return dbPool.query(queryStr);
      })
      .then((result) => {
        let newVote = result.rows[0].votes;
        newVote += inc_votes;
        updateStr = format(
          "UPDATE articles SET votes = %s WHERE article_id = %s RETURNING *;",
          newVote,
          article_id
        );
        return dbPool.query(updateStr);
      })
      .then(({ rows }) => {
        return rows[0];
      });
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};

exports.removeCommentById = (comment_id) => {
  if (checkIfNum(comment_id)) {
    return checkExists("comments", "comment_id", comment_id).then(() => {
      return dbPool.query("DELETE FROM comments WHERE comment_id = $1;", [
        comment_id,
      ]);
    });
  }
  return Promise.reject({ status: 400, msg: "Bad Request" });
};
