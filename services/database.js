import mysql from 'mysql2';

const pool = mysql.createPool({
  connectionLimit: 10, // default: 10
  waitForConnections: true, // default: true
  host: 'localhost',
  database: 'node',
  user: 'root',
  password: '',
});

export default pool.promise();
