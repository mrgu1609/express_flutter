import mysql from 'mysql2';
import type { RowDataPacket } from 'mysql2';

import keys from '../config';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, con) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(`DB ${keys.database.database} is connected`);
  con.release();
});
export { RowDataPacket };
export default pool.promise();
