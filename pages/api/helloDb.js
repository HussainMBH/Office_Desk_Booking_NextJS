import { Pool } from 'pg';

// PostgreSQL connection pool
const poolSetting = {
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  database: process.env.PGSQL_DATABASE,
};

const pool = new Pool(poolSetting);

export default async function handler(req, res) {
  try {
    // Retrieve data from PostgreSQL
    const result = await pool.query('SELECT * FROM book_a_seat.seat_objs');

    // Send response with the retrieved rows
    res.status(200).json({ rows: result.rows });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
