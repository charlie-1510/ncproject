const dbPool = require("../db/connection");

exports.accessTopics = () => {
  return dbPool.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};
