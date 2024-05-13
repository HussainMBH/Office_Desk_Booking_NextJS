import {conn, cors, runMiddleware} from '../../lib/db';

export default async function handler(req, res) {
  // console.log(req.method);
  await runMiddleware(req, res, cors);
  if (req.method === 'OPTIONS') {
    res.status(200)
  } else if (req.method === 'GET') {
    const selSeat = req.query.selSeat;
    // console.log('selSeat', selSeat);
    let rslt = null;
    if(selSeat){
      rslt = await conn.query(`select r, id, r.seat_id as seatId, r.username, to_char(r.start_date, 'YYYY-MM-DD HH24:MI:SS') as startDate, to_char(r.end_date, 'YYYY-MM-DD HH24:MI:SS') as endDate
                                  from book_a_seat.reservation r
                                  where r.seat_id = ${selSeat}
                                  order by r.start_date`);
    }
    res.status(200).json({
      rslt: rslt?.rows
    });
  } else if (req.method === 'POST') {
    let successfull = false;
    try{
      const interval = req.body.interval;

      // check if the user has in the same period already booked
      const rslt = await conn.query(`SELECT distinct (seat_id) from book_a_seat.reservation 
        where username =  '${req.body.user}' and ((start_date between '${interval[0]}' and '${interval[1]}')
          or (end_date between '${interval[0]}' and '${interval[1]}')
          or (start_date < '${interval[0]}' and end_date > '${interval[1]}'))`)
      // console.log(`SELECT distinct (seat_id) from book_a_seat.reservation 
      // where username =  '${req.body.user}' and ((start_date between '${interval[0]}' and '${interval[1]}')
      //   or (end_date between '${interval[0]}' and '${interval[1]}')
      //   or (start_date < '${interval[0]}' and end_date > '${interval[1]}'))`)
      const rows = rslt?.rows
      console.log(rows)
      if (rows.length > 0){
        // console.log('error.........', rows.map((item)=>item.seat_id))
        return res.status(200).json({
          successfull: false,
          rows: rows.map((item)=>item.seat_id)
        })
      } 
      
      conn.query(`INSERT INTO book_a_seat.reservation (seat_id, username, start_date, end_date)
          values (${req.body.seatId}, '${req.body.user}', '${interval[0]}', '${interval[1]}') `);
      successfull = true;

    } catch (error) {
      console.error(error);
    }
    console.log('everything ok')
    res.status(200).json({
      successfull: successfull
    });
  } else if (req.method === 'PUT') {
    let successfull = false;
    try{
      const interval = req.body.interval;
      // console.log(`UPDATE book_a_seat.reservation set start_date = '${interval[0]}', end_date = '${interval[1]}' where id = ${req.body.id}`);
      conn.query(`UPDATE book_a_seat.reservation set start_date = '${interval[0]}', end_date = '${interval[1]}' where id = ${req.body.id}`);
      successfull = true;

    } catch (error) {
      console.error(error);
    }

    res.status(200).json({
      successfull: successfull
    });
  } else if (req.method === 'DELETE') {
    let successfull = false;
    try{
      conn.query(`DELETE FROM book_a_seat.reservation WHERE id = ${req.query.id}`);
      successfull = true;

    } catch (error) {
      console.error(error);
    }

    res.status(200).json({
      successfull: successfull
    });
  }
}
