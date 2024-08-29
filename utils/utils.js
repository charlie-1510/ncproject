const dbPool = require("../db/connection");
const format = require("pg-format");

exports.checkExists = (table, column, value, order, desc) => {
  let queryStr;
  if (order) {
    if (desc) {
      queryStr = format(
        "SELECT * FROM %I WHERE %I = %L ORDER BY %I DESC;",
        table,
        column,
        value,
        order
      );
    } else {
      queryStr = format(
        "SELECT * FROM %I WHERE %I = %L ORDER BY %I;",
        table,
        column,
        value,
        order
      );
    }
  } else {
    queryStr = format("SELECT * FROM %I WHERE %I = %L;", table, column, value);
  }

  return dbPool.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Resource not found" });
    }
    return rows;
  });
};

exports.checkIfNum = (num) => {
  if (isNaN(Number(num))) {
    return false;
  }
  return true;
};
