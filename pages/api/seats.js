import {conn, cors, runMiddleware} from '../../lib/db';

/**
 *  GET to retrieve a resource;
 *  PUT to change the state of or update a resource, which can be an object, file or block;
 *  POST to create that resource; and
 *  DELETE to remove it.
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
  // console.log(req.method);
  await runMiddleware(req, res, cors);
  if (req.method === 'OPTIONS') {
    res.status(200)
  }
  if (req.method === 'GET') {
    const seatRslt = await conn.query('SELECT * FROM  book_a_seat.seat_objs'/*, values*/);
    const tableRslt = await conn.query('SELECT * FROM  book_a_seat.table_objs'/*, values*/);;

    res.status(200).json({
      seats: seatRslt.rows,
      tables: tableRslt.rows
    });
  } else {
    // console.log('not get........');
    let successfull = false;
    try{
      const reqObjs = req.body;
      // console.log('1');
      if(reqObjs){
        await conn.query(`DELETE FROM book_a_seat.seat_objs`);
        // console.log('2');
        reqObjs.seats.forEach(async (seat)=>{
          // console.log(`INSERT INTO book_a_seat.seat_objs (id, name, x, y)  
          // VALUES (${seat.id}, '${seat.name}', ${seat.x}, ${seat.y})`);
          // console.log('3');
          await conn.query(
            `INSERT INTO book_a_seat.seat_objs (id, name, x, y)  
            VALUES (${seat.id}, '${seat.name}', ${seat.x}, ${seat.y})`);
        });

        // console.log('4');
        await conn.query(`DELETE FROM book_a_seat.table_objs`);
        reqObjs.tables.forEach(async (table)=>{
          // console.log(`INSERT INTO book_a_seat.seat_objs (id, name, x, y)  
          // VALUES (${seat.id}, '${seat.name}', ${seat.x}, ${seat.y})`);
          // console.log('5');
          await conn.query(
            `INSERT INTO book_a_seat.table_objs (id, name, x, y, width, height)  
            VALUES (${table.id}, '${table.name}', ${table.x}, ${table.y}, ${table.width}, ${table.height})`);
        });
        successfull = true;
      }
    } catch (error) {
      console.error(error);
    }
    res.status(200).json({
      successfull: successfull
    });
  }
}
