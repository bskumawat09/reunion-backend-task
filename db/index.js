const Pool = require("pg").Pool;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});

module.exports = pool;
