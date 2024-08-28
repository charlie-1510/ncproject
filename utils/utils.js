const dbPool = require("../db/connection");
const format = require("pg-format");

exports.checkExists = (table, column, value, order, desc) => {
  let queryStr;
  if (order) {
    if (desc) {
      queryStr = format(
        "SELECT * FROM %I WHERE %I = $1 ORDER BY %I DESC;",
        table,
        column,
        order
      );
    } else {
      queryStr = format(
        "SELECT * FROM %I WHERE %I = $1 ORDER BY %I;",
        table,
        column,
        order
      );
    }
  } else {
    queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
  }

  return dbPool.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Resource not found" });
    }
    return rows;
  });
};
