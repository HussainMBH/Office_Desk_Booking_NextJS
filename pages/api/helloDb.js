import { Pool, Client } from 'pg'

const poolSetting = {
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  database: process.env.PGSQL_DATABASE,
};


export default function handler(req, res) {
    const queryDb = async () => {
        try {
            const pool = new Pool(poolSetting)
            await pool.connect();
            const rslt = await pool.query('SELECT * FROM  book_a_seat.seat_objs');
            pool.end()
            // res.send(rslt.rows);
            res.status(200).json({ rows: rslt.rows})
        } catch (error) {
            console.log(error)
            res.status(200).json({ rows: null})
        }    
    }
    queryDb();

    // res.status(200).json({ rows: "test"})
}
