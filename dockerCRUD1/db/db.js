const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST || "postgres",  // ✅ use service name!
  database: process.env.DB_NAME,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

module.exports = pool;