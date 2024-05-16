const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// PostgreSQL configuration
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '7822mysql',
  port: 5432,
});

// Handle CORS if necessary

// Define routes
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO book_a_seat.users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    const insertedUser = result.rows[0];
    client.release();
    res.status(201).json({ message: 'User registered successfully', user: insertedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
