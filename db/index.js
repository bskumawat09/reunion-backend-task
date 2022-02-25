const Pool = require("pg").Pool;

const connectionString = process.env.PG_DB_STRING;

const pool = new Pool({ connectionString });

module.exports = pool;
