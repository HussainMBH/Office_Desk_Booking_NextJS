import {conn, cors, runMiddleware} from '../../lib/db';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Handle GET request to retrieve user-related data
    // Example: Fetch user data from the database
    try {
      const users = await conn.query('SELECT * FROM book_a_seat.users');
      res.status(200).json({ users: users.rows });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'An error occurred while retrieving users' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create a new user
    const { username, password, role } = req.body;
    try {
      // Insert new user into the database
      await conn.query(
        'INSERT INTO book_a_seat.users (username, password, role) VALUES ($1, $2, $3)',
        [username, password, role]
      );
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'Username already exists' });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating user' });
      }
    }
  }
}
