import {conn, cors, runMiddleware} from '../../lib/db';

export default async function handler(req, res) {
  // console.log(req.method);
  await runMiddleware(req, res, cors);
  if (req.method === 'OPTIONS') {
    res.status(200)
  } else if (req.method === 'GET') {
    const id = req.query.id;
    let rslt = null;
    console.log('method get', id)
    if(id){
      rslt = await conn.query(`select r, id, r.seat_id as seatId, r.username, to_char(r.start_date, 'YYYY-MM-DD HH24:MI:SS') as startDate, to_char(r.end_date, 'YYYY-MM-DD HH24:MI:SS') as endDate
      from book_a_seat.reservation r
      where r.username = '${id}'
      order by r.start_date`);
    }
    res.status(200).json({
      rslt: rslt?.rows
    });
  }
}

