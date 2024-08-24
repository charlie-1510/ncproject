const dbPool = require("../db/connection");
const fs = require("fs/promises");

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
