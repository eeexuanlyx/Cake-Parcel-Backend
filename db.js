const Pool = require("pg").Pool;

const pool = new Pool({
  user: "db_user",
  password: "example",
  host: "localhost",
  port: 5432,
  database: "cakeparcel",
});

module.exports = pool;
