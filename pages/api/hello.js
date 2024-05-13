// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: ['https://book-a-seat.vercel.app', 'http://localhost:3000'],
  credentials: true
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req,res,fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  res.json({ name: 'John Doe' })
}
