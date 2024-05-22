import crypto from 'crypto';
import { cors, runMiddleware } from '../../lib/db';

const fakeLogin = [
  { user: "admin0", pwd: "admin0", role: "admin" },
  { user: "user1", pwd: "user1", role: "user" },
  { user: "Bahir", pwd: "Bahir123", role: "admin" },
  { user: "user3", pwd: "user3", role: "user" },
];

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  
  const { user, pwd } = req.body;

  // Check if the user exists in the fake login database
  const foundUser = fakeLogin.find(item => item.user === user);

  if (foundUser) {
    // User exists, check the password
    if (foundUser.pwd === pwd) {
      // Password is correct, generate token and respond
      const buffer = crypto.randomBytes(48);
      res.status(200).json({ 
        token: buffer.toString('hex'),
        role: foundUser.role,
        user: foundUser.user 
      });
    } else {
      // Password is incorrect
      res.status(401).json({ error: "Invalid password" });
    }
  } else {
    // User doesn't exist
    res.status(404).json({ error: "User not found. Please sign up." });
  }
}
