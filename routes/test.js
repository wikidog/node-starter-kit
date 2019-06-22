import express from 'express';

import mysql from 'mysql2/promise';

import dbp from '../services/database';

const router = express.Router();

// ====================================================================

const queryHandler = async (req, res, next) => {
  try {
    // with placeholder
    const sql = 'SELECT * from `employees` where `name` = ?';
    const values = ['lubing'];

    //* execute() will internally call prepare() and query()
    //* fields contains extra meta data about rows, if available
    //
    const [rows, fields] = await dbp.execute(sql, values);

    console.log('rows:', rows);
    // console.log('fields:', fields);
    res.send({ message: 'secret code 123456' });
  } catch (err) {
    next(err);
  }
};

router.get('/db_query', queryHandler);

router.get('/db_insert', (req, res, next) => {
  // prepare query
  const employee = { name: 'worker1', department: 'departmentA' };
  let sql = 'INSERT INTO `employees` SET ?';
  sql = mysql.format(sql, employee);
  // console.log('sql = ', sql);
  // execute query
  dbp.query(sql, (err, rows) => {
    if (err) {
      next(err);
      return;
    }
    console.log(rows);
    res.send({ message: 'secret code 123456' });
    return;
  });
});

export default router;
